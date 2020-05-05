import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component'; 
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './auth/adminGuard.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/authGuard.service';
import { HttpInterceptorService } from './auth/httpInterceptor.service';
import { ErrorInterceptorService } from './auth/error-interceptor.service';
import { RegisterComponent } from './register/register.component';  
import { AdminRouting } from './admin/admin.routing';
import { AdminModule } from './admin/admin.module';
import { AddFoodComponent } from './admin/food/add/addFood.component';
import { ListFoodComponent } from './admin/food/list/listFood..component';
import { DeleteFoodComponent } from './admin/food/delete/deleteFood.component';
import { EditFoodComponent } from './admin/food/edit/editFood.component';
import { AddDrinkComponent } from './admin/drink/add/addDrinkcomponent';
import { ListDrinkComponent } from './admin/drink/list/listDrink..component';
import { EditDrinkComponent } from './admin/drink/edit/editDrink.component';
import { DeleteDrinkComponent } from './admin/drink/delete/deleteDrink.component';
import { AddIngredientComponent } from './admin/ingredient/add/addIngredient.component';
import { ListIngredientComponent } from './admin/ingredient/list/listIngredient..component';
import { EditIngredientComponent } from './admin/ingredient/edit/editIngredient.component';
import { DeleteIngredientComponent } from './admin/ingredient/delete/deleteIngredient.component'; 
import { UserRouting } from './user/user.routing';
import { AddOrderComponent } from './user/addOrder/addOrder.component';
import { OrderHistoryComponent } from './user/orderHistory/orderHistory.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    AdminRouting,
    UserRouting, 
    AdminModule,
    UserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard],
        children: [
           { path: 'add-order', component: AddOrderComponent },
           { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] }
        ]
      },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], 
        children: [
          { path: 'add-food', component: AddFoodComponent, canActivate: [AdminGuard] },
          { path: 'food-list', component: ListFoodComponent, canActivate: [AdminGuard] }, 
          { path: 'edit-food/:id', component: EditFoodComponent, canActivate: [AdminGuard] },
          { path: 'delete-food', component: DeleteFoodComponent, canActivate: [AdminGuard] },

          { path: 'add-drink', component: AddDrinkComponent, canActivate: [AdminGuard] },
          { path: 'drink-list', component: ListDrinkComponent, canActivate: [AdminGuard] },
          { path: 'edit-drink/:id', component: EditDrinkComponent, canActivate: [AdminGuard] },
          { path: 'delete-drink', component: DeleteDrinkComponent, canActivate: [AdminGuard] },

          { path: 'add-ingredient', component: AddIngredientComponent, canActivate: [AdminGuard] },
          { path: 'ingredient-list', component: ListIngredientComponent, canActivate: [AdminGuard]  },
          { path: 'edit-ingredient/:id', component: EditIngredientComponent, canActivate: [AdminGuard] },
          { path: 'delete-ingredient', component: DeleteIngredientComponent, canActivate: [AdminGuard] },
        ]
      }, 
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
