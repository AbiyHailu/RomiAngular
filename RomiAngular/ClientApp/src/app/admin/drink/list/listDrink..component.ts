import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router"; 
import { SharedDataService } from "../../../services/sharedDataService";  
import { DrinkService } from "../../../services/drink.service ";

@Component(
  {
    selector: 'listdrink',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'listDrink.component.html'
  }
)

export class ListDrinkComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  drinks:any
  constructor(
   private drinkService: DrinkService,
    private shareddataService: SharedDataService,
    private router: Router,
  ) {
    this.drinks =[]
    this.drinkService.getDrinks()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res); 
        this.drinks = res; 
      })
  }

  navigateToAdd() {
    this.router.navigate(['admin/add-drink/'])
  }

  navigateToEdit(item: any) {
    this.shareddataService.changeDrink(item);
    console.log(item, item)
    this.router.navigate(['admin/edit-drink/'+ item])
  }
   
  ngOnDestroy(): void {
    this.subject.next();
  }
}
