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
import { FoodComponent } from './food/food.component';
import { AddFoodComponent } from './food/add/addFood.component';
import { ListFoodComponent } from './food/list/listFood..component';
import { EditFoodComponent } from './food/edit/editFood.component';
import { DeleteFoodComponent } from './food/delete/deleteFood.component';
import { FoodModule } from './food/food.module';

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
    FoodModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user-home', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'admin-home', component: AdminComponent, canActivate: [AdminGuard] },
      {
        path: 'foods', component: FoodComponent,
        children: [
          { path: 'add', component: AddFoodComponent, canActivate: [AdminGuard] },
          { path: 'list', component: ListFoodComponent},
          { path: 'edit/:id', component: EditFoodComponent, canActivate: [AdminGuard]},
          { path: 'delete', component: DeleteFoodComponent, canActivate: [AdminGuard]},
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
