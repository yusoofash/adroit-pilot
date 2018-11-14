import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';
import { UserType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getDecodedAccessToken();
    if (token === null) {
      // not logged in so redirect to home page with the return url
      this.router.navigate(['/404']);
      return false;
    } else if (token.roles === (UserType.USER && next.data.role)) {
      // logged in so return true
      return true;
    } else if (token.roles === (UserType.COMPANY && next.data.role)) {
      return true;
    }

    this.router.navigate(['/404']);
    return false;
  }
}
