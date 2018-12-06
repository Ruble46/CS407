using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Game2gether.API.Models;
using Game2gether.API;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Game2gether.Controllers {
    [Route("api/[controller]")]
    public class GameController : Controller {
        readonly ApplicationDbContext _context;
        readonly UserManager<AppUser> _userManager;
        readonly String SteamKey = "695E955DD129113B7EBCF61E92CB1255";
        readonly String baseURL = "http://api.steampowered.com/";

        public GameController(UserManager<AppUser> userManager, ApplicationDbContext context) {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("add/{email}/{id}")]
        public async Task<IActionResult> setSteamId(string email, string id) {
            var user = await _userManager.FindByEmailAsync(email);
            user.steamId = id;
            String queryURL = baseURL + "ISteamUser/GetPlayerSummaries/v0002/?key=" + SteamKey + "&steamids=" + id;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(queryURL);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            JObject joResponse = JObject.Parse(result);
            //.players[0].personaname
            string steamName = (string)joResponse["response"]["players"][0]["personaname"];
            //JObject steamName = (JObject)joResponse["response"]["players"][0]["personaname"];
            string steamAvatar = (string)joResponse["response"]["players"][0]["avatarmedium"];
            //user.steamName = Convert.ToString(steamName);
            //user.steamAvatar = Convert.ToString(steamAvatar);
            user.steamName = steamName;
            user.steamAvatar = steamAvatar;
            await _userManager.UpdateAsync(user);
            await setSteamGames(email, id);
            return Ok();
        }

        public async Task<IActionResult> setSteamGames(string email, string id) {
            var user = await _userManager.FindByEmailAsync(email);
            String queryURL = baseURL + "IPlayerService/GetOwnedGames/v0001/?key=" + SteamKey + "&steamid=" + id;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(queryURL);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            JObject joResponse = JObject.Parse(result);
            string games =(string)joResponse["response"]["game_count"];
            int totalGames = Convert.ToInt32(games);
            string apps = "";
            for (int i = 0; i < totalGames; i++) {
                string appId = (string)joResponse["response"]["games"][i]["appid"];
                String appIdStr = appId;
                if(i == 0) {
                    apps += appIdStr;
                } else {
                    apps += "," + appIdStr;
                }
                await getSteamGames(appId);             
            }
            user.games = apps;
            await _userManager.UpdateAsync(user);
            return Ok();
        }

        public async Task<IActionResult> getSteamGames(string id) {
            string storeUrl = "https://store.steampowered.com/api/appdetails?appids=" + id;
            var query = from p in _context.Games
                        where p.appId == id
                        select p;
            if(query == null || query.ToList().Count == 0) {
                var client = new HttpClient();
                HttpResponseMessage response = await client.GetAsync(storeUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                JObject joResponse = JObject.Parse(result);
                string success = (string)joResponse[id]["success"];
                if(!success.Equals("False")) {
                    string gameName = (string)joResponse[id]["data"]["name"];
                    string gameImg = (string)joResponse[id]["data"]["header_image"];
                    string name = Convert.ToString(gameName);
                    string img = Convert.ToString(gameImg);
                    Games game = new Games();
                    game.appId = id;
                    game.name = name;
                    game.picture = img;
                    await _context.Games.AddAsync(game);
                    _context.SaveChanges();
                }
                return Ok();
            }
            return Ok();
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> showGames(string email) {
            List<Games> games =  new List<Games>();
            var user = await _userManager.FindByEmailAsync(email);
            if(user != null) {
                var userGames = user.games.Split(",");
                try {
                    for (int i = 0; i < user.games.Length; i++)
                    {
                        var query = from p in _context.Games
                                    where p.appId == userGames[i]
                                    select p;
                        if(query.ToList().Count > 0) {
                            games.Add(query.ToArray()[0]);
                        } else {
                            continue;
                        }
                    }
                } catch (Exception e) {
                    Console.WriteLine(e.Message);
                }
                string toReturn = JsonConvert.SerializeObject(games);
                return Ok(toReturn);
            } else {
                return BadRequest("User not found");
            }
        }
    }
}