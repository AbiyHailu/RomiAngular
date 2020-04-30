import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { AdminRouting } from './admin.routing';  
import { AddFoodComponent } from './food/add/addFood.component';
import { ListFoodComponent } from './food/list/listFood..component';
import { EditFoodComponent } from './food/edit/editFood.component';
import { DeleteFoodComponent } from './food/delete/deleteFood.component';
import { AddDrinkComponent } from './drink/add/addDrinkcomponent';
import { ListDrinkComponent } from './drink/list/listDrink..component';
import { EditDrinkComponent } from './drink/edit/editDrink.component';
import { DeleteDrinkComponent } from './drink/delete/deleteDrink.component';
import { AddIngredientComponent } from './ingredient/add/addIngredient.component';
import { ListIngredientComponent } from './ingredient/list/listIngredient..component';
import { EditIngredientComponent } from './ingredient/edit/editIngredient.component';
import { DeleteIngredientComponent } from './ingredient/delete/deleteIngredient.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRouting, 
  ],
  declarations: [ 
    AddFoodComponent,
    ListFoodComponent,
    EditFoodComponent,
    DeleteFoodComponent,

    AddDrinkComponent,
    ListDrinkComponent,
    EditDrinkComponent,
    DeleteDrinkComponent,

    AddIngredientComponent,
    ListIngredientComponent,
    EditIngredientComponent,
    DeleteIngredientComponent

  ],
  exports: [ 
    AddFoodComponent,
    ListFoodComponent,
    EditFoodComponent,
    DeleteFoodComponent,

    AddDrinkComponent,
    ListDrinkComponent,
    EditDrinkComponent,
    DeleteDrinkComponent 
  ]
})
export class AdminModule { }
