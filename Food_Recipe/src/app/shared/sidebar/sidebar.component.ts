import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePasswordComponent } from 'src/app/shared/sidebar/change-password/change-password.component';
import { LogOutComponent } from './log-out/log-out.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard/dashboard.component';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface IMenu {
  title: string;
  icon: string;
  link: string;
  isActive: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

   isOpened: boolean = true;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    public dialog: MatDialog
    ,private _AuthService:AuthService, private toastr:ToastrService
  ) {}

  isAdmin(): boolean {
    return this._authService.role == 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return this._authService.role == 'SystemUser' ? true : false;
  }


  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-house',
      link: '/dashboard/home',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      title: 'Users',
      icon: 'fa-users',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-bowl-rice',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      title: 'Categories',
      icon: 'fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      title: 'User Recipes',
      icon: 'fa-bowl-rice',
      link: '/dashboard/user/recipes',
      isActive: this.isUser(),
    },
    {
      title: 'Favourites',
      icon: 'fa-heart',
      link: '/dashboard/user/favourites',
      isActive: this.isUser(),
    },
  ];


  openDialogCahngePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: {},
      width: '40%'
    });
  }

  // onChangePass(data:FormGroup){
  //   return this._AuthService.onChangePassword(data.value).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //     },
  //     error:(err:any)=>{
  //       console.log(err.error.message);
  //       this.toastr.error(err.error.message , 'error!');
  //     },
  //     complete:()=> {
  //       this.toastr.success('Password has been updated successfully', 'Done');
  //     },
  //   })
  // }
  openDialogLogOut(): void {
    const dialogRef = this.dialog.open(LogOutComponent, {
      data: {},
      width: '40%'
    });
  }
}


