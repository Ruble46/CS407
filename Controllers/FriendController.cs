using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Game2gether.API.Models;
using Game2gether.API;


namespace Game2gether.Controllers
{
    [Route("api/[controller]")]
    public class FriendController : Controller
    {
        readonly ApplicationDbContext _context;
        readonly UserManager<AppUser> _userManager;

        public FriendController(UserManager<AppUser> userManager, ApplicationDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return Ok(user.friends);
            }
            else
            {
                return BadRequest("No user found");
            }
        }

        [HttpGet("request/{email}")]
        public async Task<IActionResult> GetRequests(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user != null)
            {
                return Ok(user.friendRequests);
            } else
            {
                return BadRequest("User not found");
            }
        }

        [HttpPost("request")]
        public async Task<IActionResult> sendRequest([FromBody] FriendRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.receiver);
            if(user!=null)
            {
                user.friendRequests.Add(request);
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            else
            {
                return BadRequest("User not found");
            }
        }

        [HttpPost("request/accept")]
        public async Task<IActionResult> acceptRequest([FromBody] FriendRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.receiver);
            var user1 = await _userManager.FindByEmailAsync(request.sender);
            if (user != null)
            {
                if(user.friendRequests.Contains(request))
                {
                    user.friendRequests.Remove(request);
                    user.friends.Add(request);
                    FriendRequest temp = new FriendRequest { sender = request.receiver, receiver = request.sender };
                    user1.friends.Add(temp);
                    await _userManager.UpdateAsync(user);
                    await _userManager.UpdateAsync(user1);
                    return Ok();
                } else
                {
                    return BadRequest("No such friend request found");
                }
            } else
            {
                return BadRequest();
            }
        }

        [HttpPost("request/ignore")]
        public async Task<IActionResult> ignoreRequest([FromBody] FriendRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.receiver);
            if (user != null)
            {
                if (user.friendRequests.Contains(request))
                {
                    user.friendRequests.Remove(request);
                    await _userManager.UpdateAsync(user);
                    return Ok();
                }
                else
                {
                    return BadRequest("No such friend request found");
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}