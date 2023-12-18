import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {path:"", redirectTo: "auth", pathMatch: "full"},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
  ,{
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },{
    path:'**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
