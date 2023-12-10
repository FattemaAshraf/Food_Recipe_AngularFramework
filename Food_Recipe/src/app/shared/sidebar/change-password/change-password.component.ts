import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  // userEmail=localStorage.getItem('email');
  changePasswordForm = new FormGroup({
  oldPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$')]),
  newPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$')]),
  confirmNewPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$')]),
});

hide:boolean=false;
hideConfirm:boolean=false;

constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,private _AuthService:AuthService, private toastr:ToastrService, private _router: Router){}

  onSubmit(data:FormGroup){
    return this._AuthService.onChangePassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err:any)=>{
        this.toastr.error('Invalid password' , 'error!');
        console.log(err.message);
      },
      complete:()=> {
        this.dialogRef.close();
        this.toastr.success('Password has been updated successfully', 'Done');
      },
    })
  }
  close(){
    this.dialogRef.close();
  }
}
