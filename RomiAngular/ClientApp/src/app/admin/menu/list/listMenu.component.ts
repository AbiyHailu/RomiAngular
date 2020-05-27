import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router"; 
import { SharedDataService } from "../../../services/sharedDataService";   
import { MenuService } from "../../../services/menu.service ";

@Component(
  {
    selector: 'listmenu',
    //styleUrls: ['manage.component.scss'],
    templateUrl: 'listMenu.component.html'
  }
)

export class ListMenuComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  menus:any
  constructor(
   private menuService: MenuService,
    private shareddataService: SharedDataService,
    private router: Router,
  ) {
    this.menus =[]
    this.menuService.getMenus()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res); 
        this.menus = res; 
      })
  }

  navigateToAdd() {
    this.router.navigate(['admin/add-menu/'])
  }

  navigateToEdit(item: any) {
    this.shareddataService.changeMenu(item);
    console.log(item, item)
    this.router.navigate(['admin/edit-menu/'+ item])
  }
   
  ngOnDestroy(): void {
    this.subject.next();
  }
}
