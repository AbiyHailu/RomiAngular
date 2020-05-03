using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text; 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RomiAngular.Data;
using RomiAngular.Models;
 
namespace RomiAngular.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly RomiContext _context;

        private readonly IConfiguration _config;
        
        public LoginController(IConfiguration config, RomiContext context)
        {
            _config = config;
            _context = context;

        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            User user = AuthenticateUser(login);
            if (user != null)
            {
                var tokenString = GenerateJWT(user);
                var refreshToken = GenerateRefreshToken();
               // user.RefreshToken = refreshToken;
                response = Ok(new
                {
                    token = tokenString,
                    userDetails = user,
                    refreshToken = refreshToken
                });
            }
            return response;
        }
        User AuthenticateUser(User loginCredentials)
        {  
            User user = _context.Users.SingleOrDefault(x => x.Emailaddress == loginCredentials.Emailaddress && x.Password == loginCredentials.Password);
            return user;
        }
        string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Emailaddress),
                new Claim("firstName", userInfo.FirstName.ToString()),
                new Claim("role",userInfo.UserType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}