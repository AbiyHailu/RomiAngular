import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";  
import { IngredientService } from "../../../services/ingredient.service ";

@Component(
  {
    selector: 'deleteingredient', 
    templateUrl: 'deleteIngredient.component.html'
  }
)

export class DeleteIngredientComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  constructor(
    private ingredientService: IngredientService,
  ) {
    this.ingredientService.getIngredients()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res);
      })
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
