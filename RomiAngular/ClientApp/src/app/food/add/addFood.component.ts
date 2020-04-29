import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";  
import { FoodService, Food } from "../../services/foodService";
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component(
  {
    selector: 'addfood',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'addFood.component.html'
  }
)

export class AddFoodComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  newFood: Food;
  constructor(
    private foodService: FoodService, 
    private router: Router,
  ) {
    foodService.getFoods()
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
    this.foodService.addFoods(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Food Successfuly added!"; 
        console.log('added', res),
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
          }, 3000); 
          })
  }
  navigateToList() {
    this.router.navigate(['foods/list/'])
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
