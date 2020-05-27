import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(
    private http: HttpClient 
  ) {  }
    
  getMenus(): Observable<Menu> { 
    return <Observable<any>>this.http.get("/api/menus");
  }
  getMenuById(id:any): Observable<Menu> {
    return <Observable<any>>this.http.get("/api/menus/"+id);
  }

  addMenus(menu: Menu): Observable<any> { 
    return <Observable<any>>this.http.post("/api/menus", menu);
  }

  editMenu(menu: any): Observable<any> { 
    return <Observable<any>>this.http.put("/api/menus/" + menu.menuID, menu);
  }
}

export interface Menu {
  MenuID: any;
  MenuType: string;
  Name: string;
  UnitPrice: number;
  Description: string;
}

