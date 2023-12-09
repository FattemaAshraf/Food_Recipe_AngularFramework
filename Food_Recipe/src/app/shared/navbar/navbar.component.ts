import { Component, HostListener } from '@angular/core';
import { IUser } from 'src/app/models/iuser';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from '../profile-user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userName = localStorage.getItem('userName');
  role = localStorage.getItem('role');
  user: IUser | undefined;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  isSticky = false;
  isDarkBackground = false;
  isLightBackground=true;
  isIcon=true;
  constructor(private _userService: UserService,) {}
  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this._userService.getCurrentUser().subscribe({
      next: (res) => {
        // console.log(res);
        this.user = res;
      },
      error: () => {},
      complete: () => {},
    });
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isSticky = offset > 50; // Change the offset as needed
    this.isDarkBackground = offset > 100; // Adjust the offset where you want to change the background color
    this.isLightBackground= offset < 100;
  }
}
