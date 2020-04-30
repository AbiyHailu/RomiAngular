import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators"; 
import { DrinkService } from "../../../services/drink.service ";

@Component(
  {
    selector: 'deletedrink', 
    templateUrl: 'deleteDrink.component.html'
  }
)

export class DeleteDrinkComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  constructor(
    private drinkService: DrinkService
  ) {
    this.drinkService.getDrinks()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res);
      })
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
