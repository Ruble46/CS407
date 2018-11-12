using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Game2gether.API.Models
{
    public class FriendRequest
    {
        [Key]
        public int Id { get; set; }
        public string sender { get; set; }
        public string receiver { get; set; }
    }
}
