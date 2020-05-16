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
        public int FoodId { get; set; }
        public int DrinkId { get; set; }
        public int IngredientId { get; set; }
        public int UserId { get; set; }
        public int GustId { get; set; }


        [Column(TypeName = "decimal(10,2)")] 
        public decimal TotalExcVat { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal  servicecharge { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal vat { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalIncVat { get; set; }
        public bool deliverd { get; set; }
        public bool markasread { get; set; }


        public virtual Food Food { get; set; }
        public virtual Drink Drink { get; set; }
        public virtual Ingredient Ingredient { get; set; }
        public virtual Gust Gust { get; set; }

    }
}
 
