using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Game2gether.API.Models;
using Game2gether.API;
using Microsoft.AspNetCore.Identity;



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
            return Ok(result);
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

        [HttpGet]
        public List<Post> get()
        {
            var query = from p in _context.Posts
                        orderby p.datePosted
                        select p;
            return query.ToList();
        }        

        
        
    }
}