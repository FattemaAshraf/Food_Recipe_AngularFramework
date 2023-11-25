import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo: "login", pathMatch: "full"},
  {path: 'login', component: LogInComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  declarations: [
    LogInComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)

  ]
})
export class AuthModule { }
