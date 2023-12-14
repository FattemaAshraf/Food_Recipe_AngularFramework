import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsUserComponent } from './components/details-user/details-user.component';

const routes: Routes = [
  {path:"", component: UsersComponent},
  {path:'view/:id', component: DetailsUserComponent}

  ];

@NgModule({
  declarations: [
    UsersComponent,
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)

  ]
})
export class UsersModule { }
