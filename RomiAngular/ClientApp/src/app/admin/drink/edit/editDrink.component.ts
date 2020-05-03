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

  drink: any;
  subject: Subject<void> = new Subject(); 
  enableForm: boolean = false
  constructor(
    private drinkService: DrinkService, 
    private shareddataService: SharedDataService,
    private router: Router,
  ) { 
    this.shareddataService._currentDrink
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        this.drinkService.getDrinkById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.drink = res
            console.log("this.drink", this.drink)
            if (this.drink) {
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
    this.formdata.patchValue({ name: this.drink.name })
    this.formdata.patchValue({ unitPrice: this.drink.unitPrice })
    this.formdata.patchValue({ description: this.drink.description })
    this.enableForm = true
  }

  assignValues() {
    this.formdata.patchValue({ name: this.drink.Name })
    this.formdata.patchValue({ unitPrice: this.drink.Name })
    console.log(this.formdata)
  }
  success: string
  onClickSubmit(data) {
    this.drinkService.editDrink(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Drink Successfuly Edited!"; 
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
            this.navigateToList()
          }, 3000);
      })
  }
  navigateToList() {
    this.router.navigate(['admin/drink-list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
