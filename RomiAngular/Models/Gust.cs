using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RomiAngular.Models
{
    public class Gust
    {
        [Key]
        public Guid GustId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        //public int Address { get; set; }
    }
}
