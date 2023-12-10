import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { AuthService } from 'src/app/auth/services/auth.service';
interface IMenu {
  title: string;
  icon: string;
  link: string;
  isActive: boolean;
  length: string |null;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 userName = localStorage.getItem('userName');
 isOpened:boolean = true;
 constructor( private _authService: AuthService, private _router: Router,     private _recipeService: RecipeService
  ) {}
 isAdmin():boolean{
   return this._authService.role == 'SuperAdmin'? true : false;
 }
 isUser():boolean{
   return this._authService.role == 'SystemUser'? true : false;
 }
 menu: IMenu[] = [
   {
     title: 'Users',
     icon: 'fa-users',
     link: '/dashboard/admin/users',
     isActive: this.isAdmin(),
     length:  `+${localStorage.getItem('users')}`,
   },
   {
     title: 'Recipes',
     icon: 'fa-bowl-rice',
     link: '/dashboard/admin/recipes',
     isActive: this.isAdmin(),
     length:  `+${localStorage.getItem('adminRecipes')}`,
   },
   {
     title: 'Categories',
     icon: 'fa-calendar-days',
     link: '/dashboard/admin/categories',
     isActive: this.isAdmin(),
     length:  `+${localStorage.getItem('categories')}`,
   },
   {
     title: 'User Recipes',
     icon: 'fa-bowl-rice',
     link: '/dashboard/user/recipes',
     isActive: this.isUser(),
     length: `+${localStorage.getItem('userRecipes')}`,
   },
   {
     title: 'Favourites',
     icon: 'fa-heart',
     link: '/dashboard/user/favourites',
     isActive: this.isUser(),
     length: localStorage.getItem('favourites'),
   }
 ];
}
