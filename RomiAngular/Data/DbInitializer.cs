using RomiAngular.Data;
using RomiAngular.Models;  
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
 

            if (!context.Menus.Any())
            {
                var menus = new Menu[]
                {
                    new Menu{ MenuType = MenuEnum.Food,  Name="የፆም አገልግል", UnitPrice=100.0m, Description="1.5 እንጀራ፣ ቀይ ምስር፣ አልጫ ክክ፣ጐመን፣ጥቅል ጐመን፣ስንግ...."},
                    new Menu{ MenuType = MenuEnum.Food,   Name="የበግ ወጥ አገልግል", UnitPrice=100.0m, Description="1.5 እንጀራ፣ አልጫ ፍትፍት፣ቀይ ፍትፍት፣1አጥንት"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="የበሬ ወጥ አገልግል", UnitPrice=100.0m, Description="1.5 እንጀራ፣ አልጫ ፍትፍት፣ቀይ ፍትፍት፣1አጥንት"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="ኖርማል በርገር", UnitPrice=100.0m, Description="100ግራም ተፈጭቶ የተቀመመ ስጋ፣150ግራም ዳቦ፣ቲማቲም፣ሰላጣ"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="ስፔሻል ቺዝ በርገር", UnitPrice=100.0m, Description="100ግራም 100ግራም ተፈጭቶ የተቀመመ ስጋ፣150ግራም ዳቦ፣ቺዝ፣እንቁላል፣ቲማቲም፣ሰላጣ"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="ስፔሻል ቢፍ በርገር", UnitPrice=100.0m, Description="100ግራም ተፈጭቶ የተቀመመ ስጋ፣150ግራም ዳቦ፣ቢፍ፣እንቁላል፣ቲማቲም፣ሰላጣ"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="እንቁላል ሳንድዊች", UnitPrice=100.0m, Description="2 እንቁላል፣ቀይ ሽንኩርት፣ቅቤ፣150ግራም ዳቦ፣ቅመም"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="ስጋ ሳንድዊች", UnitPrice=100.0m, Description="የተፈጨ የበሬ ስጋ፣ቀይ ሽንኩርት፣ቅቤ፣ ነጭ ሽንኩርት፣150ግራም ዳቦ፣ቅመም"},
                    new Menu{ MenuType = MenuEnum.Food,  Name="አትክልት ሳንድዊች", UnitPrice=100.0m, Description="ድንች፣ካሮት፣ሰላጣ፣ቀይ ሽንኩርት፣ነጭ ሽንኩርት፣ቅቤ፣ጨዉ፣150ግራም ዳቦ፣ቅመም"},

                    new Menu{ MenuType = MenuEnum.Drink,  Name="Coca", UnitPrice=12.7m, Description="test"},
                    new Menu{ MenuType = MenuEnum.Drink,  Name="Bira", UnitPrice=20.2m, Description="test"},
                    new Menu{ MenuType = MenuEnum.Drink,  Name="Tea", UnitPrice=8.3m, Description = "test" },
                    new Menu{ MenuType = MenuEnum.Drink,  Name="Coffee", UnitPrice=40.5m, Description = "test" },
                    new Menu{ MenuType = MenuEnum.Drink,  Name="Juis", UnitPrice=12.7m, Description="test"},

                    new Menu{ MenuType = MenuEnum.Ingredient, Name="Berbere", UnitPrice=11.7m, Description="test"},
                    new Menu{ MenuType = MenuEnum.Ingredient, Name="Shoro", UnitPrice=22.2m, Description="test"},
                    new Menu{ MenuType = MenuEnum.Ingredient, Name="Atmit", UnitPrice=13.3m, Description="test" },
                    new Menu{ MenuType = MenuEnum.Ingredient, Name="Genfo", UnitPrice=10.5m, Description="test"}  
                };

                foreach (Menu f in menus)
                {
                    context.Menus.Add(f);
                }
                context.SaveChanges();
            }

 


            ////if (context.Orders.Where(e => e.OrderID != 3).Any())
            //if (!context.Orders.Any())
            //{
            //    var orders = new Order[]  { 
            //       new Order{ 
            //       //Foods =   new List<Food>
            //       //{
            //       //    context.Foods.Where(e=>e.Name =="Food1" ).FirstOrDefault(),
            //       //    context.Foods.Where(e=>e.Name =="Food3" ).FirstOrDefault(),
            //       //},
            //       //Drinks = new List<Drink>
            //       //{
            //       //    context.Drinks.Where(e=>e.Name =="coca" ).FirstOrDefault(),
            //       //    context.Drinks.Where(e=>e.Name =="Bira" ).FirstOrDefault(),
            //       //},
            //       //Ingredients = new List<Ingredient>()
            //       //{
            //       //    context.Ingredients.Where(e=>e.Name =="Berbere" ).FirstOrDefault(),
            //       //    context.Ingredients.Where(e=>e.Name =="Genfo" ).FirstOrDefault(),
            //       //},

            //       //OrderDate =  DateTime.Now,
            //       //PreferdDeliveryDate =  DateTime.Now
            //   },
            //};

            //foreach (Order e in orders)
            //{
            //    context.Orders.Add(e);
            //}
            //context.SaveChanges();
            //    return;   // DB has been seeded
            //}
            //else {
            //    return;
            //} 
        }
    }
}
