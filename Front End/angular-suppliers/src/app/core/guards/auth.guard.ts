import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    return this.CheckAuth();
  }
  canActivateChild(): boolean {
    return this.CheckAuth();
  }
  canDeactivate(): boolean {
    return this.CheckAuth();
  }
  canLoad(): boolean {
    return this.CheckAuth();
  }

  private CheckAuth(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigateByUrl('/auth/login');
      return true;
    }
  }
}
