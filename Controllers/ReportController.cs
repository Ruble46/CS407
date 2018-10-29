using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Game2gether.API.Models;
using Game2gether.API;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace Game2gether.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        readonly IConfiguration _config;
        readonly ApplicationDbContext _context;

        public ReportController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> newReport([FromBody] Report report)
        {
            var result = await _context.Reports.AddAsync(report);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> updateAsignee([FromBody] AppUser user, string id)
        {
            Report report = new Report();
            report = _context.Reports.Find(new Guid(id));
            report.Assigned = user.Email;
            _context.Entry(report).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("{id}/email")]
        public async Task<IActionResult> sendEmail([FromBody] Email email, string id)
        {
            var apiKey = _config["SendGridApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("support@game2gether.com", "support");
            var subject = email.Body;
            var to = new EmailAddress(email.To, "user");
            var body = email.Body;
            var htmlContent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return Ok(response);

        }

        [HttpPost("{id}/delete")]
        public async Task<IActionResult> delete(string id)
        {
            var report = await _context.Reports.FindAsync(new Guid(id));
            if(report == null)
            {
                return BadRequest();
            }
            _context.Reports.Remove(report);
            _context.SaveChanges();
            return Ok();
        }


        //Admins only
        [HttpGet]
        public List<Report> get()
        {
            var query = from p in _context.Reports
                        select p;
            return query.ToList();
        }
    }
}