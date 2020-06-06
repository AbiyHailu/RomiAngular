using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RomiAngular.Data;
using RomiAngular.Models;

namespace RomiWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly RomiContext _context;

        public OrdersController(RomiContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.OrderID)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Ordertosubmit orderandMenuids )
        {
            var order = new Order();
            order = orderandMenuids.Order;
            order.OrderID = new Guid ();
            order.OrderDate = DateTime.Now;
            order.Deliverd = false;
            order.Markasread = false; 
             _context.Orders.Add(order); 
            await _context.SaveChangesAsync();

            var menuIds = orderandMenuids.Menu ;
            foreach (var item in menuIds)
            { 
                var ordermenu = new OrderMenu();
                ordermenu.OrderID = order.OrderID;
                ordermenu.OrderMenuId = new Guid();
                ordermenu.MenuId = item.MenuID;
                _context.OrderMenus.Add(ordermenu); 
                await _context.SaveChangesAsync(); 
            }  
         
            return CreatedAtAction("GetOrder", new { id = order.OrderID }, order);
        }

 
        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.OrderID == id);
        }
    }
    public class Ordertosubmit
    {
        public Order Order { get; set; }
        public List<Menu> Menu  { get; set; }
    }
}
