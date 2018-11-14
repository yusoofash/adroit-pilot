import { Component } from '@angular/core';
import { NavbarService } from './services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Adroit Pilot';
  isSidebarOpen = false;

  constructor(
    private router: Router,
    private navbarService: NavbarService) {
    this.navbarService.sidebarOpen$.subscribe(res => this.isSidebarOpen = res);
  }
}
