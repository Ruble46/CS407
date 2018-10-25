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
    public class ReportController : Controller
    {
        readonly ApplicationDbContext _context;

        public ReportController(ApplicationDbContext context)
        {
            _context = context;
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