import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';
import { userGuard } from '../guards/user.guard';

const routes: Routes = [
  {path:"", component: DashboardComponent, children: [
    {path: 'admin', canActivate:[adminGuard] ,loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
    {path: 'user', canActivate:[userGuard] ,loadChildren: () => import('../user/user.module').then(m => m.UserModule)}
  ]
},
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
