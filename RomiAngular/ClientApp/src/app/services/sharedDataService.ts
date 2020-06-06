import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService { 
  private _menusource = new BehaviorSubject<any>('');
  _currentMenu = this._menusource.asObservable();
  changeMenu(menu: string) {
    this._menusource.next(menu)
  }  

  private _ordersource = new BehaviorSubject<any>('');
  _currentOrder = this._ordersource.asObservable();
  changeOrder(order: any ) {
    this._ordersource.next(order )
  } 
}
