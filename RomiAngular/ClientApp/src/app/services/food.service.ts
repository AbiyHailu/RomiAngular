import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FoodService {
  constructor(
    private http: HttpClient 
  ) {  }
    
  getFoods(): Observable<Food> { 
    return <Observable<any>>this.http.get("/api/foods");
  }
  getFoodById(id:any): Observable<Food> {
    return <Observable<any>>this.http.get("/api/foods/"+id);
  }

  addFoods(food: Food): Observable<any> { 
    return <Observable<any>>this.http.post("/api/foods", food);
  } 
}
export interface Food {
  FoodID: any;
  Name: string;
  UnitPrice: number;
  Description: string;
}
