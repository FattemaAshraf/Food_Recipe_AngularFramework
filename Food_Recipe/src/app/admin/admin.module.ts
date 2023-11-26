import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path:'', component: AdminComponent},
  {path:'recipes',  loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path:'categories',  loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)},
  {path:'users',  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)}
];


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
