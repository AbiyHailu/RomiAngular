using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomiAngular.Models
{
    public class Order
    {
        [Key, Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; } 
        public DateTime OrderDate { get; set; } 
        public DateTime PreferdDeliveryDate { get; set; } 
        public Guid UserId { get; set; }
        public int GustId { get; set; } 

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

        public virtual User User { get; set; } 
        public virtual Gust Gust { get; set; }
        public ICollection<Menu> Menus { get; set; }
    }
}
 
