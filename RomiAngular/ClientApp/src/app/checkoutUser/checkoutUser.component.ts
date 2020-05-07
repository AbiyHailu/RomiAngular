import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedDataService } from '../services/sharedDataService';
import { User } from '../models/User';

@Component({
  selector: 'app-checkoutUser',
  templateUrl: './checkoutUser.component.html',
})
export class CheckoutUserComponent implements OnDestroy{
  gust: any
  userData:any
  subject: Subject<void> = new Subject();

  constructor(private router: Router,
    private sharedDataService: SharedDataService) {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));
      userDetails.userName = decodeUserDetails.sub;
      userDetails.firstName = decodeUserDetails.firstName;
      userDetails.isLoggedIn = true;
      userDetails.userRole = decodeUserDetails.role;
      this.userData.next(userDetails);
      console.log("userData", this.userData)
    }

  }

  ngOnDestroy(): void {
    this.subject.next();
  }
}
