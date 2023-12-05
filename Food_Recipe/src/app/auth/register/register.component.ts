import { Component } from '@angular/core';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(''),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
    ]),
    country: new FormControl(null, [
      Validators.required
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.pattern('^01[0-2]d{1,8}$'),
    ]),
    profileImage: new FormControl(null),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'),
    ]),
  });
  message: string = '"Welcome Back"';
  hide = true;
  imgSrc: any;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  constructor(
    private _authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _router: Router
  ) {}

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
    myData.append('profileImage', this.imgSrc.this.imgSrc.name);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);

    this._authService.onRegister(myData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        // this._router.navigate(['/dashboard']);
        this.toastr.success(this.message, 'Hello');
      },
    });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
  //     data: {},
  //     width: '30%',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     if (result) {
  //       this.onRequestReset(result); //called fun to pass data
  //     }
  //   });
  // }
  // onRequestReset(data: string) {
  //   console.log(data);
  //   // let finalResult = {
  //   //   email : data
  //   // }
  //   this._authService.onRequestResetPassword(data).subscribe({
  //     next: (res: any) => {
  //       console.log(res.message);
  //       this.message = res.message;
  //     },
  //     error: (err: any) => {
  //       console.log(err.error.message);
  //       this.toastr.error(err.error.message, 'error!');
  //     },
  //     complete: () => {
  //       this.toastr.success(this.message, 'Done!');
  //       this._router.navigate(['/auth/reset-password']);
  //       localStorage.setItem('email', data);
  //     },
  //   });
  // }
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
