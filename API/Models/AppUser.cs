﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Game2gether.API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Game2gether.API.Models
{
    public class AppUser : IdentityUser
    {
        public DateTime AccountCreated { get; set; }
        public string BackgroundColor { get; set; }
        public string ChatColor { get; set; }
        public string friends { get; set; }
        public string friendRequests { get; set; }
        public string steamId { get; set; }
        public string steamName { get; set; }
        public string steamAvatar { get; set; }
        public string games { get; set; }
    }
}
