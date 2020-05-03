import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  constructor(
    private http: HttpClient 
  ) {  }
    
  getIngredients(): Observable<Ingredient> { 
    return <Observable<any>>this.http.get("/api/ingredients");
  }
  getIngredientById(id: any): Observable<Ingredient> {
    return <Observable<any>>this.http.get("/api/ingredients/"+id);
  }

  addIngredient(ingredient: Ingredient): Observable<any> { 
    return <Observable<any>>this.http.post("/api/ingredients", ingredient);
  }

  editIngredient(ing: any): Observable<any> { 
    return <Observable<any>>this.http.put("/api/ingredients/" + ing.ingredientID, ing);
  }
}
export interface Ingredient {
  IngredientID: any;
  Name: string;
  UnitPrice: number;
  Description: string;
}
