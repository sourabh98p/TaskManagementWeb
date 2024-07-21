import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; // Example authentication service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as Array<string>;
    if (this.authService.isLoggedIn() && roles.includes(this.authService.getUserRole())) {
      return true;
    }
    // Redirect to login page with return URL
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
