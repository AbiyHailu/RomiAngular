﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RomiAngular.Data;
using RomiAngular.Models;

namespace RomiWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly RomiContext _context;

        public FoodsController(RomiContext context)
        {
            _context = context;
        }
         
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetFoods()
        {
            return await _context.Foods.ToListAsync();
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<Food>> GetFood(int id)
        {
            var food = await _context.Foods.FindAsync(id);

            if (food == null)
            {
                return NotFound();
            }

            return food;
        }

        // PUT: api/Foods/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<IActionResult> PutFood(int id, Food food)
        {
            if (id != food.FoodID)
            {
                return BadRequest();
            }

            _context.Entry(food).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodExists(id))
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

        // POST: api/Foods
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        
        [HttpPost]
        [Authorize(Policy = Policies.User)]
        public async Task<ActionResult<Food>> PostFood(Food food)
        {
            _context.Foods.Add(food);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFood", new { id = food.FoodID }, food);
        }

        // DELETE: api/Foods/5
        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<ActionResult<Food>> DeleteFood(int id)
        {
            var food = await _context.Foods.FindAsync(id);
            if (food == null)
            {
                return NotFound();
            }

            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();

            return food;
        }

        private bool FoodExists(int id)
        {
            return _context.Foods.Any(e => e.FoodID == id);
        }
    }
}