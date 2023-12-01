import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxDropzoneModule
  ],
  exports:[
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    MatPaginatorModule,
    NgxDropzoneModule
  ]
})

export class SharedModule { }
