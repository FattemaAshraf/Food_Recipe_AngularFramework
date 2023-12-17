import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router = inject(Router);
  if(localStorage.getItem('userToken') !== null && localStorage.getItem('role') == 'SuperAdmin'){
    return true;
  } else{
    authService.getProfile();
    router.navigate(['/dashboard']) //only navigate on his dashboard by role superadmin can't access on SystemUser
    return false;
  }
};
