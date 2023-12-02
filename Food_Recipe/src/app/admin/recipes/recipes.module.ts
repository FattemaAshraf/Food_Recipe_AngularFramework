import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRecipeComponent } from './components/add-recipe/add-edit-recipe.component';

const routes: Routes = [
  {path:"", component: RecipesComponent},
  {path:'add', component: AddRecipeComponent}
  ];

@NgModule({
  declarations: [
    RecipesComponent,
    AddRecipeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class RecipesModule { }
