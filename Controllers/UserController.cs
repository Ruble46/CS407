using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Game2gether.API.Models;
using Game2gether.API;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Game2gether.Controllers {
    [Route("api/[controller]")]
    public class UserController : Controller {
        readonly UserManager<AppUser> _userManager;
        readonly ApplicationDbContext _context;

        public UserController(UserManager<AppUser> userManager, ApplicationDbContext context) {
            _context = context;
            _userManager = userManager;

        }

        //Get: api/user
        [HttpGet("{email}")]
        public async Task<IActionResult> GetId(string email) {
            var user = await _userManager.FindByEmailAsync(email);
            if(user != null) {
                return Ok(user);
            } else {
                return BadRequest("No user found");
            }
        }   

    }
}