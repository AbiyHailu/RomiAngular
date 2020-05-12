import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from '../services/sharedDataService';
import { GustService } from '../services/gust.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkoutGust',
  templateUrl: './checkoutGust.component.html',
})
export class CheckoutGustComponent implements OnDestroy {
  gust: any
  order: any
  subject: Subject<void> = new Subject();
  successOrder =true

  firstNumber: number;
  secondNumber: number; 
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private gustService: GustService,
    private orderService: OrderService
  ) {

    this.sharedDataService._currentOrder
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        this.order = res
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
  onClickSubmit(data) {
  
    if (this.formdata.invalid || !this.result) {
      this.onKey(null)
      return;
    }


    this.orderService.addOrders(this.order).pipe(takeUntil(this.subject))
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        if (res) {
          data.orderID = res.OrderId
          this.gustService.addGusts(data)
            .pipe(takeUntil(this.subject))
            .subscribe(res => {
              this.successOrder =false
              this.success = "Order Successfuly added! We will contact you Very soon. keep your phone with you.";
            },
              error => {
                this.successOrder = false
                this.success = "Something went wrong. Please, try again later!";
                console.log("error",error)
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
