import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from '../services/sharedDataService';
import { GustService } from '../services/gust.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-checkoutGust', 
  styleUrls: ['checkoutGust.component.css'],
  templateUrl: './checkoutGust.component.html',
})
export class CheckoutGustComponent implements OnDestroy {
 
  order: Order
  menu: any
  subject: Subject<void> = new Subject();
  successOrder =true

  firstNumber: number;
  secondNumber: number;
  orderandMenuides = { order: {}, menu: [] }
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private gustService: GustService,
    private orderService: OrderService
  ) {

    this.sharedDataService._currentOrder
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log("res", res)
        this.order = res.order
        this.menu = res.menu
        console.log(this.order)
         
      })

    this.firstNumber = Math.floor(Math.random() * 10) + 1;
    this.secondNumber = Math.floor(Math.random() * 10) + 1; 
  }
  formdata;
  ngOnInit() {
    this.formdata = new FormGroup({
      firstname: new FormControl("", Validators.compose([Validators.required])),
      lastname: new FormControl("", Validators.compose([Validators.required])),
      phone: new FormControl("", Validators.compose([Validators.required,
      Validators.minLength(10), Validators.maxLength(10)])),
    });
  }
  result = false
  wronganswer = ''
  onKey(incoming: any) {
    if (+incoming && +incoming === this.firstNumber + this.secondNumber) {
      this.result = true
      this.wronganswer = '';
    } else {
      this.result = false;
      this.wronganswer = 'Please, provide the right answer.'
    }
  }
  success: string
  fail: string
  onClickSubmit(data) { 
    data.phone = data.phone.toString();
    if (this.formdata.invalid || !this.result) {
      this.onKey(null)
      return;
    }

    this.gustService.addGusts(data)
      .pipe(takeUntil(this.subject))
      .subscribe(res => { 
        console.log("res", res)
        if (res) {
          console.log("test", res.gustId)
          this.order.gustId = res.gustId
          console.log(this.order.gustId )
          this.order.userId = null

          this.orderandMenuides.order = this.order
          this.orderandMenuides.menu = this.menu
          console.log("this.orderandMenuides", this.orderandMenuides)
          this.orderService.addOrders( this.orderandMenuides).pipe(takeUntil(this.subject))
            .pipe(takeUntil(this.subject))
            .subscribe(res => {
              this.successOrder = false
              this.success = "Order Successfuly added! We will contact you Very soon. keep your phone with you.";
              this.fail = ''
            },
              error => {
                this.successOrder = false
                this.fail = "Something went wrong. Please, try again later!";
                this.success  =''
                console.log("error", error)
              },
              () => {
                // 'onCompleted' callback.
                // No errors, route to new page here
              })
        }    
      })  
  }
  navigateToOrder() {
    this.router.navigate(["./order"])
  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
