import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedDataService } from "../../../services/sharedDataService";  
import { IngredientService, Ingredient } from "../../../services/ingredient.service ";

@Component(
  {
    selector: 'editingredient', 
    templateUrl: 'editingredient.component.html'
  }
)

export class EditIngredientComponent implements OnDestroy {

  ingredient: any;
  subject: Subject<void> = new Subject();
  enableForm: boolean = false
  constructor(
    private ingredientService: IngredientService, 
    private shareddataService: SharedDataService,
    private router: Router,
  ) { 
    this.shareddataService._currentIngredient
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        this.ingredientService.getIngredientById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.ingredient = res
            if (this.ingredient) {
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
    this.formdata.patchValue({ name: this.ingredient.name })
    this.formdata.patchValue({ unitPrice: this.ingredient.unitPrice })
    this.formdata.patchValue({ description: this.ingredient.description })
    this.enableForm = true
  }

  success: string
  onClickSubmit(data) {
    this.ingredientService.editIngredient (data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Ingredient Successfuly Edited!"; 
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
          }, 3000);
      })
  }
  navigateToList() {
    this.router.navigate(['admin/ingredient-list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
