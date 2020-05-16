using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomiAngular.Models
{
    public class Gust
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public Guid GustId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string OrderId{ get; set; }
        //public int Address { get; set; }   
        public virtual ICollection<Order> Orders { get; set; }
    }
}
