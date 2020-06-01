using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
namespace RomiAngular.Models
{
    public class Menu
    {
        [Key, Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MenuID { get; set; }

        public MenuEnum MenuType { get; set; }

        public string Name { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }

        public string Description { get; set; }

    }
  
    public enum MenuEnum
    {
       Food,
       Drink,
       Ingredient
    }
}
