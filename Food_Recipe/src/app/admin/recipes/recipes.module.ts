import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component: RecipesComponent}
  ];

@NgModule({
  declarations: [
    RecipesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecipesModule { }
