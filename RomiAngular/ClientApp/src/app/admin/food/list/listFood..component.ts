import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router"; 
import { SharedDataService } from "../../../services/sharedDataService"; 
import { FoodService } from "../../../services/food.service";

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
    this.router.navigate(['admin/add-food/'])
  }

  navigateToEdit(item: any) {
    this.shareddataService.changeItem(item);
    console.log(item, item)
    this.router.navigate(['admin/edit-food/'+ item])
  }


  ngOnDestroy(): void {
    this.subject.next();
  }
}
