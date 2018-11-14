import { Component, OnInit, HostListener, Input } from '@angular/core';
import { NavbarService } from '../../services';
import { UserType } from '../../models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  showSidebar = false;
  isDesktop = false;
  userType = UserType;
  @Input() currentUser;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const screenWidth = window.innerWidth;

    if (screenWidth > 700) {
      this.isDesktop = true;
    } else {
      this.isDesktop = false;
    }
  }
  constructor(private navbarService: NavbarService) {
    this.onResize();
    this.navbarService.sidebarOpen$.subscribe(res => this.showSidebar = res);
  }

  ngOnInit() {
  }

  closeSidebar() {
    if (!this.isDesktop) {
      this.navbarService.toggleSidebar();
    }
  }

}
