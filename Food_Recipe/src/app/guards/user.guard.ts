import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('userToken') !== null && localStorage.getItem('role') == 'SystemUser'){
    return true;
  } else{
    inject(AuthService).getProfile();
    inject(Router).createUrlTree(['/dashboard']);
    return false;
  }};
