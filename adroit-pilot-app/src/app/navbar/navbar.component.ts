import { Component, OnInit } from '@angular/core';
import { NavbarService, AuthenticationService } from '../services';
import { Router, ActivatedRoute } from '@angular/router';
import { UserType } from '../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displaySidebar = false;
  isLoggedin;
  currentUser = null;
  display = true;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private navbarService: NavbarService) {

    this.authService._isLoggedin$.subscribe(res => {
      this.isLoggedin = res;
      const decodedToken = this.authService.getDecodedAccessToken();
      let role;
      if (decodedToken === null) {
        role = null;
      } else {
        role = decodedToken.roles;
      }
      this.currentUser = role === UserType.USER ? UserType.USER : (role === UserType.COMPANY) ? UserType.COMPANY : null;
      console.log(`current user = ${this.currentUser}`);
    });

    this.navbarService.showNavbar$.subscribe(res => this.display = res);
  }

  ngOnInit() {
  }

  showSidebar() {
    this.navbarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
