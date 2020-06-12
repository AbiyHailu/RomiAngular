import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";   
import { MenuService, Menu } from "../../../services/menu.service ";

@Component(
  {
    selector: 'addmenu',
    styleUrls: ['addMenu.component.css'],
    templateUrl: 'addMenu.component.html'
  }
)

export class AddMenuComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  newMenu: Menu;
  constructor(
    private menuService: MenuService, 
    private router: Router,
  ) {
    menuService.getMenus()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res);
      })
  }

  formdata;
  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      menuType: new FormControl("", Validators.compose([Validators.required])), 
      unitPrice: new FormControl("",  Validators.compose([Validators.required])),
      description: new FormControl("",  Validators.compose([Validators.required]))
    });
  }

  success:string
  onClickSubmit(data) { 
    console.log(data)
    this.menuService.addMenus(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.success = "Menu Successfuly added!"; 
        console.log('added', res),
          setTimeout(() => {
            this.success = "";
            this.formdata.reset()
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
