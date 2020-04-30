import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";  
import { Drink, DrinkService } from "../../../services/drink.service ";

@Component(
  {
    selector: 'adddrink',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'addDrink.component.html'
  }
)

export class AddDrinkComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  newDrink: Drink;
  constructor(
    private drinkService: DrinkService, 
    private router: Router,
  ) {
    drinkService.getDrinks()
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
    this.drinkService.addDrinks(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Drink Successfuly added!"; 
        console.log('added', res),
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
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
