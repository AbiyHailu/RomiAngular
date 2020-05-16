using RomiAngular.Data;
using RomiAngular.Models; 
using System;
using System.Collections.Generic;
using System.Linq;

namespace RomiWebApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(RomiContext context)
        {
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                var users = new User[]
                {
                    new User{  Emailaddress="abiyo02@yahoo.com", FirstName="Abiy", LastName="Hailu",Password ="AdminTestPass", UserType="Admin"},
                    new User{  Emailaddress="mahz@yahoo.com", FirstName="Mahdi", LastName ="Zekarias",Password ="UserTestPass", UserType="User"},

                };

                foreach (User u in users)
                {
                    context.Users.Add(u);
                }
                context.SaveChanges();
            }

            if (!context.Foods.Any())
            {
                var foods = new Food[] 
                {
                    new Food{  Name="Food1", UnitPrice=10.7m},
                    new Food{  Name="Food2", UnitPrice=20.2m},
                    new Food{  Name="Food3", UnitPrice=30.3m},
                    new Food{ Name="Food4", UnitPrice=40.5m},
                    new Food{ Name="Food5", UnitPrice=50.0m}  
                };

                foreach (Food f in foods)
                {
                    context.Foods.Add(f);
                }
                context.SaveChanges();
            }
           
            if (!context.Drinks.Any()){  
                var drinks = new Drink[]
                {
                      new Drink{ Name="coca", UnitPrice=12.7m},
                      new Drink {Name="Bira", UnitPrice=20.2m},
                      new Drink{ Name="Tea", UnitPrice=8.3m},
                      new Drink{ Name="Coffee", UnitPrice=40.5m},
                      new Drink{ Name="Juice", UnitPrice=50.0m}
                };
                foreach (Drink c in drinks)
                {
                    context.Drinks.Add(c);
                }
                context.SaveChanges();
            }

            if (!context.Ingredients.Any())
            {
                var ingredients = new Ingredient[] 
                {
                    new Ingredient{ Name="Berbere", UnitPrice=11.7m},
                    new Ingredient{ Name="Shoro", UnitPrice=22.2m},
                    new Ingredient{ Name="Atmit", UnitPrice=13.3m},
                    new Ingredient{ Name="Genfo", UnitPrice=10.5m}
                };

                foreach (Ingredient c in ingredients)
                {
                    context.Ingredients.Add(c);
                }
                context.SaveChanges();
            }


            //if (context.Orders.Where(e => e.OrderID != 3).Any())
            if (!context.Orders.Any())
            {
                var orders = new Order[]  { 
                   new Order{ 
                   //Foods =   new List<Food>
                   //{
                   //    context.Foods.Where(e=>e.Name =="Food1" ).FirstOrDefault(),
                   //    context.Foods.Where(e=>e.Name =="Food3" ).FirstOrDefault(),
                   //},
                   //Drinks = new List<Drink>
                   //{
                   //    context.Drinks.Where(e=>e.Name =="coca" ).FirstOrDefault(),
                   //    context.Drinks.Where(e=>e.Name =="Bira" ).FirstOrDefault(),
                   //},
                   //Ingredients = new List<Ingredient>()
                   //{
                   //    context.Ingredients.Where(e=>e.Name =="Berbere" ).FirstOrDefault(),
                   //    context.Ingredients.Where(e=>e.Name =="Genfo" ).FirstOrDefault(),
                   //},

                   //OrderDate =  DateTime.Now,
                   //PreferdDeliveryDate =  DateTime.Now
               },
            };

            foreach (Order e in orders)
            {
                context.Orders.Add(e);
            }
            context.SaveChanges();
                return;   // DB has been seeded
            }
            else {
                return;
            } 
        }
    }
}
