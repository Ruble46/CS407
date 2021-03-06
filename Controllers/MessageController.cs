﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Game2gether.API.Models;
using Game2gether.API;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Game2gether.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        readonly ApplicationDbContext _context;

        public MessageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("send")]
        public async Task<IActionResult> send([FromBody] Message message)
        {
            var mes = new Message { sender = message.sender, receiver = message.receiver, content = message.content, time = DateTime.Now, unread = true };
            var result = await _context.Messages.AddAsync(mes);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("conversation/{email1}/{email2}")]
        public async Task<IActionResult> getConversation(string email1, string email2)
        {
            var messages = from mes in _context.Messages
                           where (mes.sender == email1 && mes.receiver == email2) || (mes.sender == email2 && mes.receiver == email1)
                           select mes;
            return Ok(messages);
        }

        [HttpPost("markRead")]
        public async Task<IActionResult> markRead([FromBody] Message message)
        {
            var messages = from mes in _context.Messages
                           where (mes.sender == message.sender && mes.receiver == message.receiver && mes.unread)
                           select mes;
            if(messages == null)
            {
                return Ok();
            }
            messages.ToList().ForEach(a => a.unread = false);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("getUnread/{email}/{email1}")]
        public async Task<IActionResult> getUnread(string email, string email1)
        {
            var messages = from mes in _context.Messages
                           where (mes.sender == email1 && mes.receiver == email && mes.unread)
                           select mes;
            if(messages.Count() > 0)
            {
                return Ok(messages);
            }
            else
            {
                return Ok();
            }
        }



    }
}