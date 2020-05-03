import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DrinkService {
  constructor(
    private http: HttpClient 
  ) {  }
    
  getDrinks(): Observable<Drink> { 
    return <Observable<any>>this.http.get("/api/drinks");
  }
  getDrinkById(id:any): Observable<Drink> {
    return <Observable<any>>this.http.get("/api/drinks/"+id);
  }

  addDrinks(drink: Drink): Observable<any> { 
    return <Observable<any>>this.http.post("/api/drinks", drink);
  }

  editDrink(drink: any): Observable<any> { 
    return <Observable<any>>this.http.put("/api/drinks/" + drink.drinkID, drink);
  }
}

export interface Drink {
  DrinkID: any;
  Name: string;
  UnitPrice: number;
  Description: string;
}
