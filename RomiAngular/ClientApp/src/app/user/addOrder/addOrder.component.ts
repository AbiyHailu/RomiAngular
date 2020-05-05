import { Component, OnInit, OnDestroy } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { FoodService, Food } from "../../services/food.service";
import { DrinkService, Drink } from "../../services/drink.service ";
import { IngredientService, Ingredient } from "../../services/ingredient.service ";

@Component({
  selector: 'app-addOrder',
  templateUrl: './addOrder.component.html'
})
export class AddOrderComponent implements OnInit, OnDestroy {
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
  }

  
  
  navigateto(val) {
    this.router.navigate(['user/' + val]);
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
