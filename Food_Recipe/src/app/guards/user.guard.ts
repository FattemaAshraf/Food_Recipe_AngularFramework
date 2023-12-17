import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router = inject(Router);
  if(localStorage.getItem('userToken') !== null && localStorage.getItem('role') == 'SystemUser'){
    return true;
  } else{
    authService.getProfile();
    router.navigate(['/dashboard'])
    return false;
  }
};
