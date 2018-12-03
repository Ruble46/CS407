using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models {
    public class Games {
        [Key]
        public Guid id { get; set; }
        public string name { get; set; }
        public string appId { get; set; }
        public string picture { get; set; }
    }
}

