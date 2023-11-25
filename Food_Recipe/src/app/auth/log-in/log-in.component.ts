import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'),
    ]),
  });
  message: string = '';
  hide = true;
  constructor(
    private _authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._authService.onLogin(data.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.toastr.success("Welcome Back", 'Hello');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: {},
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this.onRequestReset(result); //called fun to pass data
      }
    });
  }
  onRequestReset(data: string) {
    console.log(data);
    // let finalResult = {
    //   email : data
    // }
    this._authService.onRequestResetPassword(data).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.message = res.message;
      },
      error: (err: any) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'error!');
      },
      complete: () => {
        this.toastr.success(this.message, 'Done!');
        this._router.navigate(['/auth/reset-password']);
        localStorage.setItem('email',data);
      },
    });
  }
}
