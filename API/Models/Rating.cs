using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models {
    public class Rating {
        [Key]
        public Guid id { get; set; }
        public String title { get; set; }
        public Int16 rate { get; set; }
        public String description { get; set; }
        public String rated { get; set; }
        public String author { get; set; }
        public DateTime dateCreated { get; set; }
    }
}