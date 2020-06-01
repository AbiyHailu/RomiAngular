using Microsoft.EntityFrameworkCore; 
using RomiAngular.Models; 

namespace RomiAngular.Data
{
    public class RomiContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Menu> Menus { get; set; } 
        public DbSet<Gust> Gusts { get; set; }
        public RomiContext(DbContextOptions options): base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .ToTable("Orders")
                 .HasMany(s => s.Menus); 

            modelBuilder.Entity<Menu>()
                .ToTable("Menus");
               // .HasMany(s => s.Orders);

            modelBuilder.Entity<User>()
                .ToTable("Users");
            
            modelBuilder.Entity<Gust>()
                .ToTable("Gusts");
        }

    }
}