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

namespace Game2gether.Controllers {
    [Route("api/[controller]")]
    public class GameController : Controller {
        readonly ApplicationDbContext _context;
        readonly String SteamKey = "695E955DD129113B7EBCF61E92CB1255";
        readonly String baseURL = "http://api.steampowered.com/";

        public GameController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<string> getGamesId(string id) {
            String queryURL = baseURL + "ISteamUser/GetPlayerSummaries/v0002/?key=" + SteamKey + "&steamids=" + id;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(queryURL);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            Console.WriteLine(result);
            return result;
        }
    }
}