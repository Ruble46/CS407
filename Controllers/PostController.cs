using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Game2gether.API.Models;
using Game2gether.API;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Game2gether.Controllers
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> newPost([FromBody] Post userPost) 
        {
            userPost.datePosted = DateTime.Now;
            var result = await _context.Posts.AddAsync(userPost);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("{email}")]
        public List<Post> getUserPosts(string email)
        {
            var query = from p in _context.Posts
                        where p.email == email
                        orderby p.datePosted
                        select p;
            return query.ToList();
        }

        /* 
        [HttpGet]
        public List<Post> get()
        {
            var query = from p in _context.Posts
                        orderby p.datePosted
                        select p;
            return query.ToList();
        } 
        */       

        [HttpGet]
        public List<Post> get() {
            var query = from p in _context.Posts
                    orderby p.datePosted descending
                    select p;
            return query.ToList();
        }        
        
        [HttpGet("filter/{game}/{gameMode}/{platform}")]
        public List<Post> get(string game, string gameMode, string platform) {
            if(game.Equals("dontFilterBy")) {
                game = "";
            }
            
            if(gameMode.Equals("dontFilterBy")) {
                gameMode = "";
            }

            if(platform.Equals("dontFilterBy")) {
                platform = "";
            }
            
            if(game != "" && platform != "" && gameMode != "") { //game and platform and gameMode
                var query = from p in _context.Posts
                            where p.game == game && p.platform == platform && p.gameType == gameMode
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else if(game != "" && platform != "" && gameMode == "") { //game and platform
                var query = from p in _context.Posts
                            where p.game == game && p.platform == platform
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else if(game != "" && platform == "" && gameMode != "") {
                var query = from p in _context.Posts
                            where p.game == game && p.gameType == gameMode //game and gameMode
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else if(game == "" && platform != "" && gameMode != "") { //platform and gameMode
                var query = from p in _context.Posts
                            where p.platform == platform && p.gameType == gameMode
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else if(game != "" && platform == "" && gameMode == "") { //game
                var query = from p in _context.Posts
                            where p.game == game
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else if(game == "" && platform != "" && gameMode == "") { //platform
                var query = from p in _context.Posts
                            where p.platform == platform
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else if(game == "" && platform == "" && gameMode != "") { //gameMode
                var query = from p in _context.Posts
                            where p.gameType == gameMode
                            orderby p.datePosted descending
                            select p;
                return query.ToList();
            } else {
                var query = from p in _context.Posts
                        orderby p.datePosted descending
                        select p;
                return query.ToList();
            }
        } 
    }
}