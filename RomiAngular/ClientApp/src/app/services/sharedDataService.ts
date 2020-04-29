import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {

  private _itemsource = new BehaviorSubject<any>('');
  _currentitem = this._itemsource.asObservable();
  changeItem(item: string) {
    this._itemsource.next(item)
  }
}
