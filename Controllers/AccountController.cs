using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Net.Mail;
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

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> SignInManager, ApplicationDbContext context)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = SignInManager;
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var schemes = await _signInManager.GetExternalAuthenticationSchemesAsync();
            return Ok(schemes);
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

        [HttpGet("reset")]
        public async Task<IActionResult> reset()
        {
            /*SmtpClient client = new SmtpClient("smtpserver");
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("user", "pass");
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("support@game2gether.com");
            mailMessage.To.Add("kleaf.gbit@gmail.com");
            mailMessage.Body = "body";
            mailMessage.Subject = "subject";
            client.Send(mailMessage);*/
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("support@game2gether.com", "test");
            var subject = "Here It is boi";
            var to = new EmailAddress("kleaf.gbit@gmail.com", "test2");
            var body = "YOU JUST GOT AN EMAIL YOU NERD";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return Ok(response);
        }



        private Task<AppUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(User);
            
        }
    }
}
