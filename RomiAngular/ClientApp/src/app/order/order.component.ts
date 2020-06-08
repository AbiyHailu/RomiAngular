import { Component, OnInit, OnDestroy } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";  
import { SharedDataService } from "../services/sharedDataService";
import { MenuService, Menu } from "../services/menu.service ";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-order',
  styleUrls: ['order.component.css'],
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {
  adminData: string;
  menus: any;
  foods:any[]
  drinks: any[]
  ingredients: any[]
  user:any
  subject: Subject<void> = new Subject

  constructor(
    private menuService: MenuService, 
    private router: Router,
    private sharedDataService: SharedDataService,
    private authService: AuthService
  ) {
    this.menus =[]
    this.foods=[]
    this.drinks=[]
    this.ingredients=[]
    this.menuService.getMenus()
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.menus=res;
        console.log("mmmnu", this.menus, res)
        this.foods = res.filter(f => f["menuType"] == 0)
        this.drinks = this.menus.filter(d => d["menuType"] == 1)
        this.ingredients = this.menus.filter(i => i["menuType"] ==2)
        console.log("foods", this.foods)
        console.log("drinks", this.drinks)
        console.log("ingredients", this.ingredients)
        console.log("mmmnu", this.menus)
      }) 
  }

  ngOnInit() {

  }

  orderMenu=[]
  //orderfood = [] 
  //orderdrink = [] 
  //orderingredient = []
  checkCheckBoxvalue(checked, item ) {
    console.log()
    if (checked) {
      this.orderMenu.push(item) 
    } else { 
      const index: number = this.orderMenu.indexOf(item);
        if (index !== -1) {
          this.orderMenu.splice(index, 1); 
        }           
    }
    this.calculatePrice()
  }
 
  private toggle1: boolean = true;
  private toggle2: boolean = false;
  private toggle3: boolean = false;
  openFoodDiv() { 
    this.toggle1 = true;
    this.toggle3 = false
    this.toggle2 = false 
  } 
  openDrinkDiv() {
    this.toggle1 = false;
    this.toggle2 = true; 
    this.toggle3 = false
  }
 
  openIngDiv() {
    this.toggle1 = false;
    this.toggle2 = false;
    this.toggle3 = true
   
  }

  totalexc:number=0
  vat: number = 0
  service: number = 0
  total: number = 0
  orderfood = []
  orderingredient = []
  orderdrink = []

  calculatePrice() {
    this.orderfood = []
    this.orderingredient = []
    this.orderdrink = []
    this.totalexc = 0 
    this.vat = 0
    this.service = 0
    this.total = 0

    if (this.orderMenu.length > 0) {
      let totalmenu = 0
      this.orderMenu.forEach(f => {
        totalmenu = totalmenu + f.unitPrice 
      })
      this.totalexc = this.totalexc + totalmenu  
    } 
    let serv = +(this.totalexc + ((10 * this.totalexc) / 100)).toFixed(2) 
    this.service = +(serv - this.totalexc).toFixed(2) 
    this.vat =+((21 * serv) / 100).toFixed(2)  

    this.total = +(this.totalexc + this.service + this.vat).toFixed(2)
    this.orderfood = this.orderMenu.filter(f => f["menuType"] == 0)
    this.orderdrink = this.orderMenu.filter(d => d["menuType"] == 1)
    this.orderingredient = this.orderMenu.filter(i => i["menuType"] == 2)

  }
  orderToSubmit = {
    PreferdDeliveryDate: Date, 
    totalExcVat: 0,
    servicecharge:0,
    vat: 0,
    totalIncVat: 0,
    userId: "",
    gustId: "",
  }
  orderandMenuides = {  order: { }  ,   menu: []  }
  checkoutGust() {
    this.orderandMenuides.menu= [] 
    this.orderandMenuides.order = this.checkoutOrder() 
    this.orderMenu.forEach(e =>
      this.orderandMenuides.menu.push(e)
    )  
   
    this.sharedDataService.changeOrder(this.orderandMenuides)
    this.router.navigate(['checkout-gust']);
  }
  checkoutUser() {
    this.orderandMenuides.menu = []
    this.orderandMenuides.order = this.checkoutOrder()
    this.orderMenu.forEach(e =>
      this.orderandMenuides.menu.push(e) 
    )  
    this.sharedDataService.changeOrder(this.orderandMenuides)
    this.router.navigate(['checkout-user']);
  }
  
  checkoutOrder() { 
    this.orderToSubmit.PreferdDeliveryDate 
    this.orderToSubmit.totalExcVat = this.totalexc
    this.orderToSubmit.servicecharge = this.service
    this.orderToSubmit.vat = this.vat 
    this.orderToSubmit.totalIncVat = this.total  
    return this.orderToSubmit
  }

  navigateto(val) {
    this.router.navigate(['user/' + val]);
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
