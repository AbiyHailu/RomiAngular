import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router"; 
import { FoodService, Food } from "../../../services/food.service";
import { IngredientService, Ingredient } from "../../../services/ingredient.service ";

@Component(
  {
    selector: 'addingredient',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'addIngredient.component.html'
  }
)

export class AddIngredientComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  newIngredient: Ingredient;
  constructor(
    private ingredientService: IngredientService, 
    private router: Router,
  ) {
    ingredientService.getIngredients()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res);
      })
  }

  formdata;
  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required ])),
      unitPrice: new FormControl("",  Validators.compose([Validators.required])),
      description: new FormControl("",  Validators.compose([Validators.required]))
    });
  }

  success:string
  onClickSubmit(data) { 
    console.log(data)
    this.ingredientService.addIngredient(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Ingredient Successfuly added!"; 
        console.log('added', res),
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
          }, 3000); 
          })
  }
  navigateToList() {
    this.router.navigate(['admin/ingredient-list/'])
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
