import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedDataService } from '../services/sharedDataService';
import { User } from '../models/User';
import { OrderService, Order } from '../services/order.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkoutUser',
  templateUrl: './checkoutUser.component.html',
})
export class CheckoutUserComponent implements OnDestroy{
  
  order: Order
  menu: any
  userData:any
  subject: Subject<void> = new Subject();
  userDetails = new User();
  successOrder = true  
  orderandMenuides = { order: {}, menu: [] }
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService, 
    private orderService: OrderService, 
    private authService: AuthService, 
    private userService:UserService,
  ) {
    this.sharedDataService._currentOrder
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        this.order = res.order
        this.menu = res.menu

      })
    this.authService.userData.asObservable()
      .pipe(takeUntil(this.subject))
      .subscribe(data => {
      this.userData = data;
        console.log(" this.userData" , this.userData )
    });
  }
  ngOnInit() {
     
  }
  success: string
  fail: string
  onClickSubmit( ) { 
    this.userService.getUserByEmail(this.userData.userName)
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        if (res) {
          this.order.gustId = null;
          this.order.userId = res.userID
          this.orderandMenuides.order = this.order
          this.orderandMenuides.menu = this.menu
          console.log("this.orderandMenuides", this.orderandMenuides)

          this.orderService.addOrders(this.orderandMenuides).pipe(takeUntil(this.subject))
            .pipe(takeUntil(this.subject))
            .subscribe(res => {
              console.log("res", res)
              this.successOrder = false
              this.success = "Order Successfuly added! We will contact you Very soon. keep your phone with you.";
              this.fail = ''
            },
              error => {
                this.successOrder = false
                this.fail = "Something went wrong. Please, try again later!";
                this.success = ''
                console.log("error", error)
              },
              () => {
                // 'onCompleted' callback.
                // No errors, route to new page here
              }) 
        }
      })
  } 
  

  ngOnDestroy(): void {
    this.subject.next();
  }
}
