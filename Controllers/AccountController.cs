using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Game2gether.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Game2gether.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        readonly UserManager<IdentityUser> _userManager;
        readonly SignInManager<IdentityUser> _signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> SignInManager)
        {
            _userManager = userManager;
            _signInManager = SignInManager;
        }
        // Post: api/account/register
        [HttpPost("register")]
        public async Task<IdentityUser> Post([FromBody] UserForm form)
        {
            var user = new IdentityUser { Email = form.email, UserName = form.email };
            var result = await _userManager.CreateAsync(user, form.password);
            if(result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
            }
            return user;
        }

        // Post: api/account/login
        [HttpPost("login")]
        public async Task<IdentityUser> Login([FromBody] UserForm user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.email, user.password, false, false);
            if (result.Succeeded)
            {
                return await GetCurrentUserAsync();
            }
            return await GetCurrentUserAsync();



        }

        //Get: api/account
        [HttpGet]
        public async Task<string> Get()
        {
            var user = await GetCurrentUserAsync();
            if(user==null)
            {
                return "no user";
            } else
            {
                return "user here";
            }
        }


        private Task<IdentityUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(User);
            
        }
    }
}
