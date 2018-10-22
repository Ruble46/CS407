using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models
{
    public class Post
    {
        [Key]
        public Guid id { get; set; }
        public string email { get; set; }
        public String title { get; set; }
        public String content { get; set; }
        public String game { get; set; }
        public DateTime datePosted { get; set; }
        public String gameType { get; set; }
        public String platform { get; set; }
    }
}
