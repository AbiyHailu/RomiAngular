import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GustService {
  constructor(
    private http: HttpClient
  ) { }

  getGusts(): Observable<Gust> {
    return <Observable<any>>this.http.get("/api/gusts");
  }
  getGustById(id: any): Observable<Gust> {
    return <Observable<any>>this.http.get("/api/gusts/" + id);
  }

  addGusts(gust: Gust): Observable<any> { 
    return <Observable<any>>this.http.post("/api/gusts", gust);
  }

  editGusts(gust: any): Observable<any> {
    return <Observable<any>>this.http.put("/api/gusts/" + gust.gustId, gust);
  }
}

export interface Gust {
  GustID: any;
  FirsName: string
  LastName:string
  OrderId: string
  phone:string
}
