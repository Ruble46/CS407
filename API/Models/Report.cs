using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Game2gether.API.Models
{
    public class Report
    {
        [Key]
        public Guid id { get; set; }
        public string Reason { get; set; }
        public string Description { get; set; }
        public string Reporter { get; set; }
        public string Reported { get; set; }
        public string Assigned { get; set; }
        public DateTime dateCreated { get; set; }
    }
}
