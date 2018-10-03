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
            var user = new AppUser { Email = form.email, UserName = form.email, AccountCreated = DateTime.Now };
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

        [HttpPost("external")]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action("ExternalCallback", "api/Account", new { ReturnUrl = returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties("Facebook", redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpGet("ExternalCallback")]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ModelState.AddModelError(string.Empty, $"Error from external provider: {remoteError}");
                return View(nameof(Login));
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                // Update any authentication tokens if login succeeded
                await _signInManager.UpdateExternalAuthenticationTokensAsync(info);

                return Redirect(returnUrl);
            }
            if (result.IsLockedOut)
            {
                return View("Lockout");
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["ProviderDisplayName"] = info.ProviderDisplayName;
                //var email = info.Principal.FindFirst(ClaimTypes.Email);
                return View();
            }
        }

        [HttpPost("reset/request")]
        public async Task<IActionResult> resetRequest([FromBody] UserForm email)
        {
            var user = await _userManager.FindByEmailAsync(email.email);
            if(user==null)
            {
                return Ok();
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var apiKey = _config["SendGridApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("support@game2gether.com", "support");
            var subject = "Game2Gether password reset";
            var to = new EmailAddress(email.email, "user");
            var body = "";
            var htmlContent = "<strong>Password reset link for " + email.email + ". Follow this link <a href = 'http://localhost:58619/passwordReset/" + email.email + "/" + Uri.EscapeDataString(token) + "'>http://localhost:58619/</a></strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return Ok(response);
        }

        [HttpPost("reset")]
        public async Task<IActionResult> resetRequest([FromBody] PasswordResetForm form)
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

        private Task<AppUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(User);
            
        }
    }
}
