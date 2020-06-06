using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomiAngular.Models
{
    public class Order
    {
        [Key] 
        public Guid OrderID { get; set; }
        public DateTime OrderDate { get; set; } 
        public DateTime PreferdDeliveryDate { get; set; } 
        public Guid? UserId { get; set; }
        public Guid? GustId { get; set; } 

        [Column(TypeName = "decimal(10,2)")] 
        public decimal TotalExcVat { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal  Servicecharge { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Vat { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalIncVat { get; set; }
        public bool Deliverd { get; set; }
        public bool Markasread { get; set; }
         
    }
}
 
