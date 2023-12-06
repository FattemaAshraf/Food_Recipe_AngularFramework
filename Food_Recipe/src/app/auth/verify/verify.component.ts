import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  verifyForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
    ]),
    code: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ])
  });
  message: string = '"Welcome"';
  constructor(
    public dialogRef: MatDialogRef<VerifyComponent>,
    private _authService : AuthService,
    private toastr: ToastrService,
    private _router: Router) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data: FormGroup){
    console.log(data.value);
this._authService.onVerify(data.value).subscribe({
  next: (res:any)=> {
res = this.verifyForm;
  },
  error: (err:any)=>{
    this.toastr.error(err.error.message, 'Error!');
  },
  complete: () => {
    this.toastr.success(this.message, 'Hello');
    this.dialogRef.close();
this._router.navigate(['/auth/login'])
  }
})
  }
}
