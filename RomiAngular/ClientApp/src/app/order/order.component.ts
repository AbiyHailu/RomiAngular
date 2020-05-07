import { Component, OnInit, OnDestroy } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators"; 
import { Ingredient, IngredientService } from "../services/ingredient.service ";
import { Drink, DrinkService } from "../services/drink.service ";
import { Food, FoodService } from "../services/food.service";

@Component({
  selector: 'app-order',
  styleUrls: ['order.component.css'],
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {
  adminData: string;
  foods: Food;
  drinks: Drink;
  ingredients: Ingredient; 
  subject: Subject<void> = new Subject

  constructor(
   // private userService: UserService,
    private foodService: FoodService,
    private drinkService: DrinkService,
    private ingredientService: IngredientService,
    private router: Router
  ) {

    this.foodService.getFoods()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.foods = res;
      })

    this.drinkService.getDrinks()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.drinks = res;
      })

    this.ingredientService.getIngredients()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.ingredients = res;
      }) 
  }
  ngOnInit() {
  }

  orderfood = [] 
  orderdrink = [] 
  orderingredient = []
  checkCheckBoxvalue(checked, item, type) { 
    if (checked) {
      if (type == 'food') {
        this.orderfood.push(item)
        console.log('added', this.orderfood)
      }
      if (type == 'drink') {
        this.orderdrink.push(item)
        console.log('added', this.orderdrink)
      }
      if (type == 'ing') {
        this.orderingredient.push(item)
        console.log('added', this.orderingredient)
      }
    } else {
      if (type == 'food') {
        const index: number = this.orderfood.indexOf(item);
        if (index !== -1) {
          this.orderfood.splice(index, 1); 
        }         
      }
      if (type == 'dink') {
        const index: number = this.orderdrink.indexOf(item);
        if (index !== -1) {
          this.orderdrink.splice(index, 1);
          console.log('re', this.orderdrink)
        }
      }
      if (type == 'ing') {
        const index: number = this.orderingredient.indexOf(item);
        if (index !== -1) {
          this.orderingredient.splice(index, 1);
        }
      }  
    }
    this.calculatePrice()
  }
 
  private toggle1: boolean = true;
  private toggle2: boolean = false;
  private toggle3: boolean = false;
  openFoodDiv() { 
    this.toggle1 = true;
    this.toggle3 = false
    this.toggle2 = false 
  } 
  openDrinkDiv() {
    this.toggle1 = false;
    this.toggle2 = true; 
    this.toggle3 = false
  }
 
  openIngDiv() {
    this.toggle1 = false;
    this.toggle2 = false;
    this.toggle3 = true
   
  }

  totalexc:number=0
  vat: number = 0
  service: number = 0
  total: number = 0

  calculatePrice() {
    this.totalexc = 0 
    this.vat = 0
    this.service = 0
    this.total = 0

    this.orderfood
    this.orderdrink
    this.orderingredient

    if (this.orderfood.length > 0) {
      let totalfood = 0
      this.orderfood.forEach(f => {
        totalfood = totalfood + f.unitPrice
        console.log(totalfood)

      })
      this.totalexc = this.totalexc + totalfood 
 
    }

    if (this.orderdrink.length > 0) {
      let totaldrink = 0
      this.orderdrink.forEach(f => {
        totaldrink = totaldrink + f.unitPrice
        console.log('drink', totaldrink)

      })
      this.totalexc = this.totalexc + totaldrink  
    }

    if (this.orderingredient.length > 0) {
      let totaling = 0
      this.orderingredient.forEach(f => {
        totaling = totaling + f.unitPrice
        console.log('totaling', totaling) 
      })

      this.totalexc = this.totalexc + totaling
    } 
    let serv = +(this.totalexc + ((10 * this.totalexc) / 100)).toFixed(2) 
    this.service = +(serv - this.totalexc).toFixed(2) 
    this.vat =+((21 * serv) / 100).toFixed(2)  

    this.total = +(this.totalexc + this.service + this.vat).toFixed(2) 
    console.log("this.totalexc", this.totalexc) 
    console.log("this.total", this.total)
    console.log("this.vat", this.vat)
  }
   
  navigateto(val) {
    this.router.navigate(['user/' + val]);
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
