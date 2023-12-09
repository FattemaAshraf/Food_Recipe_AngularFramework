import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from 'src/app/models/iuser';
import { HelperService } from 'src/app/services/helper.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent {
  user: IUser | any;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  isUpdatedPage: boolean = true;
  updateForm = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(''),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
    ]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.pattern('^01[0-2]d{1,8}$'),
    ]),
    profileImage: new FormControl(null),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'),
    ]),
  });
  message: string = '"Welcome Back"';
  hide = true;
  imgSrc: any;

  constructor(
    private _userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _router: Router
  ) {
    if (this.isUpdatedPage) {
      this.getCurrentUser();
    }
  }

  getCurrentUser() {
    return this._userService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        this.imgSrc = this.pathHttps + this.user?.imagePath;
        this.updateForm.patchValue({
          userName: this.user?.userName,
          email: this.user?.email,
          country: this.user.country,
          phoneNumber: this.user.phoneNumber,
          profileImage: this.imgSrc,
          confirmPassword: this.user.confirmPassword,
        });
      },
    });
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    let myData = new FormData();
    // let myMap = new Map(Object.entries(data.value));
    // for (const [key, val] of myMap) {
    //   console.log(key, val);
    //   console.log(data.value[key]);
    //   myData.append(key, data.value[key]);
    //   // myData.append(key, JSON.stringify(val)); ==> json make ""
    // }
    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('profileImage', this.imgSrc, this.imgSrc.name);
    myData.append('confirmPassword', data.value.confirmPassword);

    this._userService.updateCurrentProfile(myData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Updated');
      },
    });
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
