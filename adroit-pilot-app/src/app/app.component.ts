import { Component } from '@angular/core';
import { NavbarService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Adroit Pilot';
  isSidebarOpen = false;

  constructor(private navbarService: NavbarService) {
    this.navbarService.sidebarOpen$.subscribe(res => this.isSidebarOpen = res);
  }
}
