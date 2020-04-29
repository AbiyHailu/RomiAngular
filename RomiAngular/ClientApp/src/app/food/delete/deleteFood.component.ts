import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";  
import { FoodService } from "../../services/foodService";
import { takeUntil } from "rxjs/operators";

@Component(
  {
    selector: 'deletefood', 
    templateUrl: 'deleteFood.component.html'
  }
)

export class DeleteFoodComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  constructor(
    private foodService: FoodService,
  ) {
    foodService.getFoods()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res);
      })
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
