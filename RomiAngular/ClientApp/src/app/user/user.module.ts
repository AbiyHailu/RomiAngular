import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { UserRouting } from './user.routing';    
import { OrderHistoryComponent } from './orderHistory/orderHistory.component';
import { AddOrderComponent } from './addOrder/addOrder.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRouting, 
  ],
  declarations: [ 
    AddOrderComponent,
    OrderHistoryComponent 
  ],
  exports: [
    AddOrderComponent,
    OrderHistoryComponent 
  ]
})
export class UserModule { }
