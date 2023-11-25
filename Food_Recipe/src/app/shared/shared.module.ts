import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  exports:[
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NavbarComponent,
    SidebarComponent
  ]
})

export class SharedModule { }
