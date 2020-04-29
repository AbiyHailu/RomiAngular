import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";  
import { FoodService, Food } from "../../services/foodService";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { SharedDataService } from "../../services/sharedDataService";

@Component(
  {
    selector: 'listfood',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'listFood.component.html'
  }
)

export class ListFoodComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  foods:any
  constructor(
    private foodService: FoodService,
    private shareddataService: SharedDataService,
    private router: Router,
  ) {
    this.foods =[]
    foodService.getFoods()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res); 
        this.foods = res; 
      })
  }

  navigateToAdd() {
    this.router.navigate(['foods/add/'])
  }

  navigateToEdit(item: any) {
    this.shareddataService.changeItem(item);
    console.log(item, item)
    this.router.navigate(['foods/edit/'+ item])
  }


  ngOnDestroy(): void {
    this.subject.next();
  }
}
