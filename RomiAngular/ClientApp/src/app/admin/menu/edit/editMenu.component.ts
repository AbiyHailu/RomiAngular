import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedDataService } from "../../../services/sharedDataService";  
import { MenuService } from "../../../services/menu.service ";

@Component(
  {
    selector: 'editmenu', 
    templateUrl: 'editMenu.component.html'
  }
)

export class EditMenuComponent implements OnDestroy {

  menu: any;
  subject: Subject<void> = new Subject(); 
  enableForm: boolean = false
  constructor(
    private menuService: MenuService, 
    private shareddataService: SharedDataService,
    private router: Router,
  ) { 
    this.shareddataService._currentMenu
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        this.menuService.getMenuById(res)
          .pipe(takeUntil(this.subject))
          .subscribe(res => {
            this.menu = res
            console.log("this.drink", this.menu)
            if (this.menu) {
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
    this.formdata.patchValue({ name: this.menu.name })
    this.formdata.patchValue({ unitPrice: this.menu.unitPrice })
    this.formdata.patchValue({ description: this.menu.description })
    this.enableForm = true
  }

  assignValues() {
    this.formdata.patchValue({ name: this.menu.Name })
    this.formdata.patchValue({ unitPrice: this.menu.Name })
    console.log(this.formdata)
  }
  success: string
  onClickSubmit(data) {

    data.menuID = this.menu.drinkID 
    this.menuService.editMenu(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Drink Successfuly Edited!"; 
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
            this.navigateToList()
          }, 3000);
      })
  }
  navigateToList() {
    this.router.navigate(['admin/menu-list/'])
  }
  ngOnDestroy(): void {
    this.subject.next();
  }
}
