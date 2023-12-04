import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddToFavouriteComponent } from './components/add-to-favourite/add-to-favourite.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

const routes : Routes =[
  {path:'', component: UserRecipesComponent}
]


@NgModule({
  declarations: [
    UserRecipesComponent,
    AddToFavouriteComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserRecipesModule { }
