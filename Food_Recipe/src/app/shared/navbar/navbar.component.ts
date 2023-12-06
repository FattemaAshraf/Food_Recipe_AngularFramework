import { Component } from '@angular/core';
import { IUser } from 'src/app/models/iuser';
import { HelperService } from 'src/app/services/helper.service';

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

  constructor(private _helperService: HelperService) {}
  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this._helperService.getCurrentUser().subscribe({
      next: (res) => {
        // console.log(res);
        this.user = res;
      },
      error: () => {},
      complete: () => {},
    });
  }
}
