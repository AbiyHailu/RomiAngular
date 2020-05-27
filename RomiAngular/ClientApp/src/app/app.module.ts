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
import { UserRouting } from './user/user.routing';
import { AddOrderComponent } from './user/addOrder/addOrder.component';
import { OrderHistoryComponent } from './user/orderHistory/orderHistory.component';
import { UserModule } from './user/user.module'; 
import { OrderComponent } from './order/order.component'; 
import { CheckoutGustComponent } from './checkoutGust/checkoutGust.component';
import { CheckoutUserComponent } from './checkoutUser/checkoutUser.component';
import { DeleteMenuComponent } from './admin/menu/delete/deleteMenu.component';
import { EditMenuComponent } from './admin/menu/edit/editMenu.component';
import { ListMenuComponent } from './admin/menu/list/listMenu.component';
import { AddMenuComponent } from './admin/menu/add/addMenu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    OrderComponent,
    CheckoutGustComponent,
    CheckoutUserComponent
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
      { path: 'order', component: OrderComponent },
      { path: 'checkout-gust', component: CheckoutGustComponent },
      { path: 'checkout-user', component: CheckoutUserComponent },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard],
        children: [
           { path: 'add-order', component: AddOrderComponent },
           { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] }
        ]
      },
      { path: 'menu-list', component: ListMenuComponent, canActivate: [AdminGuard] },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], 
        children: [
          { path: 'add-menu', component: AddMenuComponent, canActivate: [AdminGuard] },
          { path: 'menu-list', component: ListMenuComponent, canActivate: [AdminGuard] }, 
          { path: 'edit-menu/:id', component: EditMenuComponent, canActivate: [AdminGuard] },
          { path: 'delete-menu', component: DeleteMenuComponent, canActivate: [AdminGuard] }, 
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
