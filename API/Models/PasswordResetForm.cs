using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models
{
    public class PasswordResetForm
    {
        public string token { get; set; }
        public string email { get; set; }
        public string newPassword { get; set; }
        public string oldPassword { get; set; }
    }
}
