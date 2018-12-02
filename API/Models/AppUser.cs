﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Game2gether.API.Models;

namespace Game2gether.API.Models
{
    public class AppUser : IdentityUser
    {
        public DateTime AccountCreated { get; set; }
        public string BackgroundColor { get; set; }
        public string ChatColor { get; set; }
<<<<<<< HEAD
        public Message[] messages { get; set; }
        public string friends { get; set; }
        public string friendRequests { get; set; }
=======
        public string SteamId { get; set; }
        public string SteamName { get; set; }
>>>>>>> Steam API Call
    }
}
