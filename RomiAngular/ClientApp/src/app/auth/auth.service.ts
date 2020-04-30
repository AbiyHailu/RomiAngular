import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class AuthService {

  userData = new BehaviorSubject<User>(new User());
  constructor(private http: HttpClient, private router: Router) { }
  register(userDetails) {
    return this.http.post<any>('/api/register', userDetails) 
  }

  login(userDetails) {
    return this.http.post<any>('/api/login', userDetails)
      .pipe(map(response => {
        localStorage.setItem('authToken', response.token);
        this.setUserDetails();
        return response;
      }));
  }

  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));
      userDetails.userName = decodeUserDetails.sub;
      userDetails.firstName = decodeUserDetails.firstName;
      userDetails.isLoggedIn = true;
      userDetails.userRole = decodeUserDetails.role;
      this.userData.next(userDetails);
    }
  } 

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }


}
