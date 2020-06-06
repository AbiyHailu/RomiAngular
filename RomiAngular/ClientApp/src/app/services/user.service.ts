import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  myAppUrl = '';
  constructor(private http: HttpClient) {
  }
 
  getUserByEmail(email: any): Observable<User> {
    return <Observable<any>>this.http.get("/api/Users/" + email);
  }

  getAdminData() {
    return this.http.get('/api/user/GetAdminData').pipe(map(result => result));
  }
}
