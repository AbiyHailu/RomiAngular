import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedDataService } from "../../../services/sharedDataService";  
import { IngredientService, Ingredient } from "../../../services/ingredient.service ";

@Component(
  {
    selector: 'editingredient', 
    templateUrl: 'editingredient.component.html'
  }
)

export class EditIngredientComponent implements OnDestroy {

  ingredient: Ingredient;
  subject: Subject<void> = new Subject();
  constructor(
    private ingredientService: IngredientService, 
    private shareddataService: SharedDataService,
    private router: Router,
  ) {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      unitPrice: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required]))
    });
  
  }

  formdata;
  ngOnInit() {

    this.shareddataService._currentitem
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        this.ingredientService.getIngredientById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.ingredient = res
            console.log("this.food", this.ingredient)

            if (this.ingredient) {
              this.assignValues()
            }
          })
      })
    
   
  }
  assignValues() {
    this.formdata.patchValue({ name: this.ingredient.Name })
    this.formdata.patchValue({ unitPrice: this.ingredient.Name })
    console.log(this.formdata)
  }
  success: string
  onClickSubmit(data) {
    //console.log(data)
    //this.foodService.addFoods(data)
    //  .pipe(takeUntil(this.subject))
    //  .subscribe(res => {
    //    this.success = "Food Successfuly added!";
    //    console.log('added', res),
    //      setTimeout(() => {
    //        this.success = "";
    //        this.formdata.reset()
    //      }, 3000);
    //  })
  }
  navigateToList() {
    this.router.navigate(['admin/ingredient-list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
