import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
}
