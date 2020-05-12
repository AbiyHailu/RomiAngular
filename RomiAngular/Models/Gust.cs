using System; 
using System.ComponentModel.DataAnnotations; 
namespace RomiAngular.Models
{
    public class Gust
    {
        [Key]
        public Guid GustId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string OrderId{ get; set; }
        //public int Address { get; set; }
    }
}
