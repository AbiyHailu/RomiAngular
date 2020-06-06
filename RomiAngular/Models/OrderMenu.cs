using System; 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RomiAngular.Models
{
    public class OrderMenu
    {
        [Key, Column(Order = 1)]
        public Guid OrderMenuId { get; set; }
        public Guid OrderID { get; set; }
        public int MenuId { get; set; }
    }
}
