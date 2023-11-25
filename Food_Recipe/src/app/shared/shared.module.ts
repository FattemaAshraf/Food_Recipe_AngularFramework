import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [],
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
    MatDialogModule
  ]
})

export class SharedModule { }
