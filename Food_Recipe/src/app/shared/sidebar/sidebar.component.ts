import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenu {
  title: string;
  icon: string;
  link: string;
  isActive: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isOpened:boolean = true;
  constructor(private _authService: AuthService, private _router: Router) {}
  isAdmin():boolean{
    return this._authService.role == 'SuperAdmin'? true : false;
  }
  isUser():boolean{
    return this._authService.role == 'SystemUser'? true : false;
  }
  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      link: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser()
    },
    {
      title: 'Users',
      icon: 'fa-users',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin()
    },
    {
      title: 'Recipes',
      icon: 'fa-bowl-rice',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin()
    },
    {
      title: 'Categories',
      icon: 'fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin()
    },
    {
      title: 'User Recipes',
      icon: 'fa-bowl-rice',
      link: '/dashboard/user/recipes',
      isActive: this.isUser()
    },
    {
      title: 'Favourites',
      icon: 'fa-heart',
      link: '/dashboard/user/favourites',
      isActive: this.isUser()
    }
  ];

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this._router.navigate(['/auth']);

  }
}
