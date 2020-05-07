import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<Order> {
    return <Observable<any>>this.http.get("/api/orders");
  }
  getOrderById(id: any): Observable<Order> {
    return <Observable<any>>this.http.get("/api/orders/" + id);
  }

  addOrders(order: Order): Observable<any> {
    return <Observable<any>>this.http.post("/api/orders", order);
  }

  editOrders(order: any): Observable<any> {
    return <Observable<any>>this.http.put("/api/orders/" + order.OrderID, order);
  }
}

export interface Order {
  OrderID: any;
  OrderDate:any
  PreferdDeliveryDate:any
  Foods:any
  Drinks: any
  Ingredients:any 
  TotalExcVat: number
  servicecharge: number
  vat: number
  TotalIncVat: number
  deliverd: boolean
  markasread: boolean
}
