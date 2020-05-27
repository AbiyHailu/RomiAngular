import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { AdminRouting } from './admin.routing';  
import { AddMenuComponent } from './menu/add/addMenu.component';
import { ListMenuComponent } from './menu/list/listMenu.component';
import { EditMenuComponent } from './menu/edit/editMenu.component';
import { DeleteMenuComponent } from './menu/delete/deleteMenu.component';
 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRouting, 
  ],
  declarations: [ 
    AddMenuComponent,
    ListMenuComponent,
    EditMenuComponent,
    DeleteMenuComponent, 
  ],
  exports: [ 
    AddMenuComponent,
    ListMenuComponent,
    EditMenuComponent,
    DeleteMenuComponent, 
  ]
})
export class AdminModule { }
