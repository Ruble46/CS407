using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Game2gether.API.Models
{
    public class AppUser : IdentityUser
    {
        public DateTime AccountCreated { get; set; }
    }
}
