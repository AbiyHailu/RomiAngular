import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {

  private _foodsource = new BehaviorSubject<any>('');
  _currentFood = this._foodsource.asObservable();
  changeFood(food: string) {
    this._foodsource.next(food)
  }

  private _drinksource = new BehaviorSubject<any>('');
  _currentDrink = this._drinksource.asObservable();
  changeDrink(drink: string) {
    this._drinksource.next(drink)
  }

  private _ingredientsource = new BehaviorSubject<any>('');
  _currentIngredient = this._ingredientsource.asObservable();
  changeIngredient(ing: string) {
    this._ingredientsource.next(ing)
  }

  private _ordersource = new BehaviorSubject<any>('');
  _currentOrder = this._ordersource.asObservable();
  changeOrder(order: string) {
    this._ordersource.next(order)
  }
}
