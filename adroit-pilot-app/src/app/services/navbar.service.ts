import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  init_sidebar_status = false;
  openSidebar = new Subject<boolean>();
  sidebarOpen$ = this.openSidebar.asObservable();

  navbarShow = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.navbarShow.asObservable();

  constructor() { }

  toggleSidebar() {
    this.init_sidebar_status = !this.init_sidebar_status;
    this.openSidebar.next(this.init_sidebar_status);
  }

  toggleNavbar() {
    this.navbarShow.next(!this.navbarShow.getValue());
  }

}
