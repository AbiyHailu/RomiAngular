import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";
import { FoodService } from "../services/foodService";
import { takeUntil } from "rxjs/operators";

@Component(
  {
    selector: 'foods',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'food.component.html'
  }
)

export class FoodComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  constructor(
    private foodService: FoodService, 
  ) { 
    foodService.getFoods()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
      //  console.log('testres', res);
      })  
  }
 
  ngOnDestroy(): void {
    this.subject.next();
  }
}
