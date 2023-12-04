import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', component: UserComponent},
  {path:'recipes',  loadChildren: () => import('./user-recipes/user-recipes.module').then(m => m.UserRecipesModule)},
  {path:'favourites',  loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesModule)},

];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
