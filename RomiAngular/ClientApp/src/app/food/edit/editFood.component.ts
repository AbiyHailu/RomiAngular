import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";  
import { FoodService, Food } from "../../services/foodService";
import { takeUntil } from "rxjs/operators";
import { SharedDataService } from "../../services/sharedDataService";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component(
  {
    selector: 'editfood', 
    templateUrl: 'editFood.component.html'
  }
)

export class EditFoodComponent implements OnDestroy {

  food: Food;
  subject: Subject<void> = new Subject();
  constructor(
    private foodService: FoodService, 
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
        this.foodService.getFoodById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.food = res
            console.log("this.food", this.food)

 if (this.food) {
      this.assignValues()
    }
          })
      })
    
   
  }
  assignValues() {
    this.formdata.patchValue({ name: this.food.name })
    this.formdata.patchValue({ unitPrice: this.food.unitPrice })
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
    this.router.navigate(['foods/list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
