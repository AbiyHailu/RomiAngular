import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FoodRouting } from './food.routing';
import { AddFoodComponent } from './add/addFood.component';
import { FoodComponent } from './food.component';
import { ListFoodComponent } from './list/listFood..component';
import { EditFoodComponent } from './edit/editFood.component';
import { DeleteFoodComponent } from './delete/deleteFood.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FoodRouting
  ],
  declarations: [
    FoodComponent,
    AddFoodComponent,
    ListFoodComponent,
    EditFoodComponent,
    DeleteFoodComponent
  ],
  exports: [
    FoodComponent,
    AddFoodComponent
  ]
})
export class FoodModule {  }
