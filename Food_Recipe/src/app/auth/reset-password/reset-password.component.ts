import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,16}$/;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  hide = true;
  hideConfirm = true;
  userEmail = localStorage.getItem('email');
  message: string = '"Welcome Back"';

  resetForm = new FormGroup(
    {
      email: new FormControl(this.userEmail, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
      ]),
      password: new FormControl(null, [
        Validators.required,
      Validators.pattern(StrongPasswordRegx)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
      ]),
      seed: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );
  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
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
    return this.resetForm.get('password')?.errors?.['pattern'];

  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._authService.onResetPassword(data.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
      },
    });
  }
}
