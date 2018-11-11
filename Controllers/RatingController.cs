using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Game2gether.API.Models;
using Game2gether.API;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Game2gether.Controllers {
    [Route("api/[controller]")]
    public class RatingController : Controller {
        readonly ApplicationDbContext _context;

        public RatingController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> newRating([FromBody] Rating userRating) {
            userRating.dateCreated = DateTime.Now;
            var result = await _context.Ratings.AddAsync(userRating);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("{email}")]
        public List<Rating> getUserRates(string email) {
            var query = from p in _context.Ratings
                        where p.rated == email
                        orderby p.dateCreated
                        select p;
            return query.ToList();
        }
    }
}