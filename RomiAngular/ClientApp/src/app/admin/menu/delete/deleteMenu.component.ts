import { Subject } from "rxjs";
import { OnDestroy, Component } from "@angular/core";   
import { takeUntil } from "rxjs/operators";  
import { MenuService } from "../../../services/menu.service ";

@Component(
  {
    selector: 'deletemenu', 
    templateUrl: 'deleteMenu.component.html'
  }
)

export class DeleteMenuComponent implements OnDestroy {

  subject: Subject<void> = new Subject();
  constructor(
    private menuService: MenuService
  ) {
    this.menuService.getMenus()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log('res', res);
      })
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
