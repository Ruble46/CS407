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

        [HttpPost("remove")]
        public async Task<IActionResult> delete(FriendRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.receiver);
            if (user != null)
            {
                var userFriends = user.friends.Split(",");
                if (userFriends.Contains(request.sender))
                {
                    userFriends = userFriends.Where(w => w != request.sender).ToArray();
                    string joined = string.Join(",", userFriends);
                    user.friends = joined;
                    await _userManager.UpdateAsync(user);
                    return Ok();
                }
                else
                {
                    return Ok();
                }

            } else
            {
                return BadRequest();
            }
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var ret = user.friends.Split(",");
                ret = ret.Where(w => w != "").ToArray();
                return Ok(ret);
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
                var ret = user.friendRequests.Split(",");
                ret = ret.Where(w => w != "").ToArray();
                return Ok(ret);
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

                var userRequests = user.friendRequests.Split(",");
                userRequests.Append(request.sender);
                var joined = string.Join(",", userRequests);
                user.friendRequests = joined;
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
                var userRequests = user.friendRequests.Split(",");
                if (userRequests.Contains(request.sender))
                {
                    userRequests = userRequests.Where(w => w != request.sender).ToArray();
                    string joined = string.Join(",", userRequests);
                    user.friendRequests = joined;
                    var userFriends = user.friends.Split(",");
                    userFriends.Append(request.sender);
                    joined = string.Join(",", userFriends);
                    user.friends = joined;

                    userFriends = user1.friends.Split(",");
                    userFriends.Append(request.receiver);
                    joined = string.Join(",", userFriends);
                    user1.friends = joined;
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
                var userRequests = user.friendRequests.Split(",");
                if (userRequests.Contains(request.sender))
                {
                    userRequests = userRequests.Where(w => w != request.sender).ToArray();
                    string joined = string.Join(",", userRequests);
                    user.friendRequests = joined;
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