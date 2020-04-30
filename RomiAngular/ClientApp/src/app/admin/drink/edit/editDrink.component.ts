import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedDataService } from "../../../services/sharedDataService"; 
import { DrinkService, Drink } from "../../../services/drink.service ";

@Component(
  {
    selector: 'editdrink', 
    templateUrl: 'editDrink.component.html'
  }
)

export class EditDrinkComponent implements OnDestroy {

  drink: Drink;
  subject: Subject<void> = new Subject();
  constructor(
    private drinkService: DrinkService, 
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
        this.drinkService.getDrinkById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.drink = res
            console.log("this.drink", this.drink)

 if (this.drink) {
      this.assignValues()
    }
          })
      })  
  }

  assignValues() {
    this.formdata.patchValue({ name: this.drink.Name })
    this.formdata.patchValue({ unitPrice: this.drink.Name })
    console.log(this.formdata)
  }
  success: string
  onClickSubmit(data) {
    //console.log(data)
    //this.drinkService.adddrinks(data)
    //  .pipe(takeUntil(this.subject))
    //  .subscribe(res => {
    //    this.success = "Drink Successfuly added!";
    //    console.log('added', res),
    //      setTimeout(() => {
    //        this.success = "";
    //        this.formdata.reset()
    //      }, 3000);
    //  })
  }
  navigateToList() {
    this.router.navigate(['admin/drink-list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
