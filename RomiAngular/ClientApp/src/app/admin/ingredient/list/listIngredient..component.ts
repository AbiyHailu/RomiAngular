import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router"; 
import { SharedDataService } from "../../../services/sharedDataService";  
import { IngredientService } from "../../../services/ingredient.service ";

@Component(
  {
    selector: 'listingredient',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'listIngredient.component.html'
  }
)

export class ListIngredientComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  ingredients:any
  constructor(
    private ingredientService: IngredientService,
    private shareddataService: SharedDataService,
    private router: Router,
  ) {
    this.ingredients  =[]
    this.ingredientService.getIngredients()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res); 
        this.ingredients = res; 
      })
  }

  navigateToAdd() {
    this.router.navigate(['admin/add-ingredient/'])
  }

  navigateToEdit(item: any) {
    this.shareddataService.changeIngredient(item);
    console.log(item, item)
    this.router.navigate(['admin/edit-ingredient/'+ item])
  }


  ngOnDestroy(): void {
    this.subject.next();
  }
}
