using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models {
    public class Games {
        [Key]
        public Guid id { get; set; }
        public String name { get; set; }
        public List<String> genres { get; set; }
        public List<String> platforms { get; set; }
        // public Image picture { get; set; }
    }
}

