import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedDataService } from "../../../services/sharedDataService"; 
import { FoodService, Food } from "../../../services/food.service";

@Component(
  {
    selector: 'editfood', 
    templateUrl: 'editFood.component.html'
  }
)

export class EditFoodComponent implements OnDestroy {

  food: any;
  subject: Subject<void> = new Subject();
  enableForm: boolean =false
  constructor(
    private foodService: FoodService, 
    private shareddataService: SharedDataService,
    private router: Router,
  ) {
    this.shareddataService._currentFood
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.foodService.getFoodById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.food = res 
            if (this.food) {   
              this.CreateForm()
            } 
          })
      })
 }

 formdata;
  ngOnInit() {
  }

  CreateForm() {
    this.formdata = new FormGroup({ 
      name: new FormControl("", Validators.compose([Validators.required])),
      unitPrice: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required]))
    }); 
    this.formdata.patchValue({ name: this.food.name })
    this.formdata.patchValue({ unitPrice: this.food.unitPrice })
    this.formdata.patchValue({ description: this.food.description }) 
    this.enableForm =true
  }

  success: string
  onClickSubmit(data) {
    data.foodID =this.food.foodID 
    this.foodService.editFood(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Food Successfuly Edited!"; 
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
            this.navigateToList()
          }, 3000);
      })
  }
  navigateToList() {
    this.router.navigate(['foods/food-list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
