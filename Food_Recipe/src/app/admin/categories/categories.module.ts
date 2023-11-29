import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';

const routes: Routes = [
  {path:'', component: CategoriesComponent}
  ];


@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CategoriesModule { }
