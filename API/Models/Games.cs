using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Game2gether.API.Models {
    public class Games {
        [Key]
        public Guid id { get; set; }
<<<<<<< HEAD
        public string name { get; set; }
=======
        public String name { get; set; }
>>>>>>> Steam API Conection. Missing Migrations Update
        public string appId { get; set; }
        public string picture { get; set; }
    }
}

