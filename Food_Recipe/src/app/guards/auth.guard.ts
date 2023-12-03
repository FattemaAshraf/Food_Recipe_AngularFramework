import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router = inject(Router);
  if(localStorage.getItem('userToken') !== null){
    return true;
  } else{
    router.navigate(['/auth'])
    return false;
  }
};
