using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RomiAngular.Data;
using RomiAngular.Models;

namespace RomiAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GustsController : ControllerBase
    {
        private readonly RomiContext _context;

        public GustsController(RomiContext context)
        {
            _context = context;
        }

        // GET: api/Gusts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gust>>> GetGust()
        {
            return await _context.Gusts.ToListAsync();
        }

        // GET: api/Gusts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gust>> GetGust(Guid id)
        {
            var gust = await _context.Gusts.FindAsync(id);

            if (gust == null)
            {
                return NotFound();
            }

            return gust;
        }

        // PUT: api/Gusts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGust(Guid id, Gust gust)
        {
            if (id != gust.GustId)
            {
                return BadRequest();
            }

            _context.Entry(gust).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GustExists(id))
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

        // POST: api/Gusts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Gust>> PostGust(Gust gust)
        {
            _context.Gusts.Add(gust);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGust", new { id = gust.GustId }, gust);
        }

        // DELETE: api/Gusts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Gust>> DeleteGust(Guid id)
        {
            var gust = await _context.Gusts.FindAsync(id);
            if (gust == null)
            {
                return NotFound();
            }

            _context.Gusts.Remove(gust);
            await _context.SaveChangesAsync();

            return gust;
        }

        private bool GustExists(Guid id)
        {
            return _context.Gusts.Any(e => e.GustId == id);
        }
    }
}
