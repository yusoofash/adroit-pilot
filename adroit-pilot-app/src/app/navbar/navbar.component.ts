import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displaySidebar = false;

  constructor(private navbarService: NavbarService) {
  }

  ngOnInit() {
  }

  showSidebar() {
    this.navbarService.toggleSidebar();
  }

}
