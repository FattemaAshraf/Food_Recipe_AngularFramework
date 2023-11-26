import { Component } from '@angular/core';

interface IMenu {
  title: string;
  icon: string;
  link: string;
  isActive: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor() {}
  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      link: '',
      isActive: true,
    },
    {
      title: 'Users',
      icon: 'fa-users',
      link: '/dashboard/admin/users',
      isActive: true,
    },
    {
      title: 'Recipes',
      icon: 'fa-bowl-rice',
      link: '/dashboard/admin/recipes',
      isActive: true,
    },
    {
      title: 'Categories',
      icon: 'fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: true,
    }
  ];
}
