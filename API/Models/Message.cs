using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public String sender { get; set; }
        public String receiver { get; set;}
        public String content { get; set; }
        public DateTime time { get; set; }
        public Boolean unread { get; set; }
    }
}
