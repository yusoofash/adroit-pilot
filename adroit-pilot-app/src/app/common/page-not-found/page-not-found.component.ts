import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '../../services';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import { UserType } from 'src/app/models';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private navbarService: NavbarService) {
    this.navbarService.toggleNavbar();
  }

  goHome() {
    const user = this.authService.currentUser();
    if (user) {
      if (user === UserType.USER) {
        this.router.navigate(['/user-home']);
      } else if (user === UserType.COMPANY) {
        this.router.navigate(['/company-home']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('called');
    this.navbarService.toggleNavbar();
  }

}
