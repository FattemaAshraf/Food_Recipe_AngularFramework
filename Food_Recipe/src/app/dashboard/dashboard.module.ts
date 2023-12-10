import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';
import { userGuard } from '../guards/user.guard';
import { HomeComponent } from '../shared/home/home.component';
import { ChangePasswordComponent } from '../shared/sidebar/change-password/change-password.component';
import { ProfileUserComponent } from '../shared/profile-user/profile-user.component';

const routes: Routes = [
  {path:"", component: DashboardComponent, children: [
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'profile', component: ProfileUserComponent},
    {path: 'admin', canActivate:[adminGuard] ,loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
    {path: 'user', canActivate:[userGuard] ,loadChildren: () => import('../user/user.module').then(m => m.UserModule)},
  ]
},
];

@NgModule({
  declarations: [
    DashboardComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
