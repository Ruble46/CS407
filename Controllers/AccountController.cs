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
using System.Security.Claims;
using System.Net.Http;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Game2gether.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        readonly UserManager<AppUser> _userManager;
        readonly SignInManager<AppUser> _signInManager;
        readonly ApplicationDbContext _context;
        readonly IConfiguration _config;
        readonly HttpClient Client = new HttpClient();

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> SignInManager, ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = SignInManager;
            _config = config;
        }
        // Post: api/account/register
        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] UserForm form)
        {
            var user = new AppUser { Email = form.email, UserName = form.email, AccountCreated = DateTime.Now, friends = "", friendRequests = "", steamId = "", steamName = "", steamAvatar = "", games = "" };
            var result = await _userManager.CreateAsync(user, form.password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
            } else
            {
                return BadRequest(result.Errors);
            }
            return Ok(user);
        }

        // Post: api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForm user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.email, user.password, false, false);
            if (result.Succeeded)
            {
                return Ok(await _userManager.FindByEmailAsync(user.email));
            }
            return BadRequest("Invalid Login");
        }

        //Get: api/account
        [HttpGet("{email}")]
        public async Task<IActionResult> GetId(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user != null)
            {
                return Ok(user);
            } else
            {
                return BadRequest("No user found");
            }
        }

        [HttpPost("google")]
        public async Task<IActionResult> Google ([FromBody] GoogleUser model)
        {
            var user = await _userManager.FindByEmailAsync(model.email);
            if(user != null)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(user);
            } else
            {
                user = new AppUser { Email = model.email, UserName = model.email, AccountCreated = DateTime.Now };
                var result = await _userManager.CreateAsync(user, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8) + "aA!");
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
                return Ok(user);

            }

        }

        [HttpPost("facebook")]
        public async Task<IActionResult> Facebook([FromBody] ExternalAuth model)
        {
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id=500263577156314&client_secret=eb82d0f1cbb41f3d9fe2b4931b377783&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);

            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if(!userAccessTokenValidation.Data.IsValid)
            {
                return BadRequest();
            }

            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            var user = await _userManager.FindByEmailAsync(userInfo.Email);
            

            if(user == null)
            {
                var appUser = new AppUser
                {
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    AccountCreated = DateTime.Now,
                };

                var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));
                if (!result.Succeeded)
                {
                    return BadRequest();
                }
                user = await _userManager.FindByEmailAsync(userInfo.Email);
            }

            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok();

        }

        /*
        [HttpPost("external")]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            return Challenge(provider, Url.Action("ExternalLoginCallback", "api/Account", new { ReturnUrl = returnUrl}));
        }

        [HttpGet("ExternalCallback")]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ModelState.AddModelError(string.Empty, $"Error from external provider: {remoteError}");
                return BadRequest("here");
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return BadRequest(info);
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.ToString(), info.ToString(), isPersistent: false);
            if (result.Succeeded)
            {
                return Ok("bad");
            }
            if (result.IsLockedOut)
            {
                return BadRequest("doublebad");
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.ToString();

                //var email = info.Principal.FindFirst(ClaimTypes.Email);
                //var user = new AppUser { Email = email.ToString(), UserName = email.ToString(), AccountCreated = DateTime.Now };

                return Ok();
                
            }
        }
        */

        [HttpPost("reset/request")]
        public async Task<IActionResult> resetRequest([FromBody] UserForm email)
        {
            var user = await _userManager.FindByEmailAsync(email.email);
            if(user == null)
            {
                return BadRequest();
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var apiKey = _config["SendGridApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("support@game2gether.com", "support");
            var subject = "Game2Gether password reset";
            var to = new EmailAddress(email.email, "user");
            var body = "";
            var htmlContent = "<strong>Password reset link for " + email.email + ". Follow this link <a href = 'http://localhost:5000/passwordReset/" + email.email + "/" + Uri.EscapeDataString(token) + "'>http://localhost:5000/</a></strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return Ok(response);
        }

        [HttpPost("reset")]
        public async Task<IActionResult> reset([FromBody] PasswordResetForm form)
        {
            var user = await _userManager.FindByEmailAsync(form.email);
            if(user == null)
            {
                return BadRequest();
            }
            var result = await _userManager.ResetPasswordAsync(user, form.token, form.newPassword);
            if(result.Succeeded)
            {
                return Ok();
            } else
            {
                return BadRequest(result);
            }

        }

        [HttpPost]
        public async Task<IActionResult> updateProfile([FromBody] UserForm form)
        {
            var user = await _userManager.FindByEmailAsync(form.email);
            user.BackgroundColor = form.BackgroundColor;
            user.ChatColor = form.ChatColor;
            var result = await _userManager.UpdateAsync(user);
            if(result.Succeeded)
            {
                return Ok();
            } else
            {
                return BadRequest(result);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("ban")]
        public async Task<IActionResult>ban([FromBody] dynamic data)
        {
            string email = data.email;
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("User Not Found");
            }
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                var posts = from post in _context.Posts
                              where post.email == email
                              select post;
                if(posts.Count() > 0) {
                    _context.Remove(_context.Posts.Single(a => a.email == email));
                }
                var ratings = from rating in _context.Ratings
                              where rating.rated == email
                              select rating;
                if(ratings.Count() > 0)
                {
                    _context.Remove(_context.Ratings.Single(a => a.rated == email));
                }
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> delete([FromBody] UserForm form)
        {
            var user = await _userManager.FindByEmailAsync(form.email);
            if(user==null)
            {
                return BadRequest("User Not Found");
            }
            var result = await _userManager.DeleteAsync(user);
            if(result.Succeeded)
            {
                var posts = from post in _context.Posts
                            where post.email == form.email
                            select post;
                if (posts.Count() > 0)
                {
                    _context.Remove(_context.Posts.Single(a => a.email == form.email));
                }
                var ratings = from rating in _context.Ratings
                              where rating.rated == form.email
                              select rating;
                if (ratings.Count() > 0)
                {
                    _context.Remove(_context.Ratings.Single(a => a.rated == form.email));
                }
                _context.SaveChanges();
                return Ok();
            } else
            {
                return BadRequest();
            }
        }

        [HttpGet("gettoken/{email}")]
        public async Task<IActionResult> getToken(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            return Ok(token);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("roles/promote/{email}")]
        public async Task<IActionResult> promote(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var roleResult = _userManager.AddToRoleAsync(user, "Admin");
            _context.SaveChanges();
            return Ok(roleResult);

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("roles/demote/{email}")]
        public async Task<IActionResult> demote (string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var roleResult = _userManager.RemoveFromRoleAsync(user, "Admin");
            _context.SaveChanges();
            return Ok(roleResult);
        }

        [HttpGet("roles/{email}")]
        public async Task<IList<String>> getRoles(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return await _userManager.GetRolesAsync(user);
        }

        private Task<AppUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(User);
            
        }
    }
}
