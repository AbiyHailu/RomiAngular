import { Component, OnInit, OnDestroy } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserService } from "../../services/user.service"; 
import { MenuService } from "../../services/menu.service ";

@Component({
  selector: 'app-addOrder',
  templateUrl: './addOrder.component.html'
})
export class AddOrderComponent implements OnInit, OnDestroy {
  adminData: string;
  foods:any;
  drinks: any;
  ingredients: any; 
  subject: Subject<void> = new Subject

  constructor(
   // private userService: UserService,
    private  menuService: MenuService, 
    private router: Router
  ) {

    this.menuService.getMenus()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        //filter for all
        this.foods = res;
      }) 
    
  }
  ngOnInit() {
  }

  orderfood = [] 
  orderdrink = [] 
  orderingredient = []
  checkCheckBoxvalue(checked, item, type) { 
    if (checked) {
      if (type == 'food') {
        this.orderfood.push(item)
        console.log('added', this.orderfood)
      }
      if (type == 'drink') {
        this.orderdrink.push(item)
        console.log('added', this.orderdrink)
      }
      if (type == 'ing') {
        this.orderingredient.push(item)
        console.log('added', this.orderingredient)
      }
    } else {
      if (type == 'food') {
        const index: number = this.orderfood.indexOf(item);
        if (index !== -1) {
          this.orderfood.splice(index, 1); 
        }         
      }
      if (type == 'dink') {
        const index: number = this.orderdrink.indexOf(item);
        if (index !== -1) {
          this.orderdrink.splice(index, 1);
          console.log('re', this.orderdrink)
        }
      }
      if (type == 'ing') {
        const index: number = this.orderingredient.indexOf(item);
        if (index !== -1) {
          this.orderingredient.splice(index, 1);
        }
      }  
    }
  }

  
  
  navigateto(val) {
    this.router.navigate(['user/' + val]);
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
