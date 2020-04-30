using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RomiAngular.Data;
using RomiAngular.Models;
using System.Linq; 

namespace RomiAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly RomiContext _context;

        public RegisterController(RomiContext context)
        {
            _context = context;
        }
          
        [HttpPost]
        [AllowAnonymous]
        public  IActionResult Register(User user)
        {
            IActionResult response = Unauthorized();
            User registerdUser = _context.Users.SingleOrDefault(x => x.Emailaddress == user.Emailaddress);
            if (registerdUser == null)
            {
                user.UserType = "User";
                _context.Users.Add(user);
                _context.SaveChangesAsync();
                return Ok("{}");
            } 
            return response; 
        } 
    }
}
