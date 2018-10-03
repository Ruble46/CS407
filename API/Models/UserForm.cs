using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models
{
    public class UserForm
    {
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string BackgroundColor { get; set; }
        public string ChatColor { get; set; }
    }
}
