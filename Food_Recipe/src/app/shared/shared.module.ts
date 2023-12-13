import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { RouterModule } from '@angular/router';
import { NoDataComponent } from './no-data/no-data.component';
import { TrimDescriptionPipe } from './pipes/trim-description.pipe';
import { LogOutComponent } from './sidebar/log-out/log-out.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DeleteDialogComponent,
    ProfileUserComponent,
    NoDataComponent,
    TrimDescriptionPipe,
    LogOutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxDropzoneModule,
    RouterModule,
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
    NgxDropzoneModule,
    NoDataComponent,
    TrimDescriptionPipe,
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SharedModule { }
