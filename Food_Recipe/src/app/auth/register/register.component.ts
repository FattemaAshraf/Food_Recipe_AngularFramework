import { Component } from '@angular/core';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VerifyComponent } from '../verify/verify.component';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,16}$/;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.pattern('([a-zA-Z]){3,12}([0-9]{1,3})')
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    country: new FormControl(null, [
      Validators.required
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(01|01|00201)[0-2,5]{1}[0-9]{8}')
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(StrongPasswordRegx)
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
    ]),
  },{validators: this.passwordMatchValidator,}
  );
  message: string = '"Welcome in Food Recipe"';
  hide = true;
  imgSrc: any;
  pathHttps: string = 'https://upskilling-egypt.com:443/';
  constructor(
    private _authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _router: Router
  ) {}
  passwordMatchValidator(control: any) {
    let password =control.get('password');
    let confirmPassword=control.get('confirmPassword')
    if (password.value == confirmPassword.value) {
      return null;
    } else {
      control
        .get('confirmPassword')
        ?.setErrors({ invalid: 'password and confirm password not match' });
      return { invalid: 'password and confirm password not match' };
    }
  }

  get passwordFormField() {
    return this.registerForm.get('password')?.errors?.['pattern'];

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
    myData.append('profileImage', this.imgSrc,this.imgSrc.name);
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
        this.openDialog();
        this.toastr.success(this.message, 'Hello');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: {},
      width: '40%',
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
