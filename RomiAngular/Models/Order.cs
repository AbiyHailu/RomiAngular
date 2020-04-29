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
        //who ordered it 
        public DateTime OrderDate { get; set; } 
        public DateTime PreferdDeliveryDate { get; set; } 
        public List<Food> Foods { get; set; }
        public List<Drink> Drinks { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        [Column(TypeName = "decimal(10,2)")] 
        public decimal TotalExcVat { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalIncVat { get; set; }
        public bool deliverd { get; set; }
        public bool markasread { get; set; }
    }
}
 
