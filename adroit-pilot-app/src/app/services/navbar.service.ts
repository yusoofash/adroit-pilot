import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  init_sidebar_status = false;
  openSidebar = new Subject<boolean>();
  sidebarOpen$ = this.openSidebar.asObservable();

  constructor() { }

  toggleSidebar() {
    this.init_sidebar_status = !this.init_sidebar_status;
    this.openSidebar.next(this.init_sidebar_status);
  }

}
