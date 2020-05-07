import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from '../services/sharedDataService';

@Component({
  selector: 'app-checkoutGust',
  templateUrl: './checkoutGust.component.html',
})
export class CheckoutGustComponent implements OnDestroy{
  gust: any
  subject: Subject<void> = new Subject();

  constructor(private router: Router,
    private sharedDataService: SharedDataService) {

    sharedDataService._currentOrder
      .pipe(takeUntil(this.subject))
      .subscribe(res => {
        console.log(res)
      })

  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
