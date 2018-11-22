import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { UserType } from '../models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthenticationService) {
    const role = this.authService.currentUserRole();
    if (role) {
      if (role === UserType.COMPANY) {
        this.router.navigate(['/company-home']);
      } else if (role === UserType.USER) {
        this.router.navigate(['/user-home']);
      }
    }
  }

  ngOnInit() {
  }

  signup() {
    this.router.navigate(['/user-signup']);
  }

}
