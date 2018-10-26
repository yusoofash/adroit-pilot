import { Injectable } from '@angular/core';
import { RouterLinks } from '../routerlinks';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  fillerNav: Array<Object>;
  constructor() { }

  navlinks() {
    this.fillerNav = RouterLinks;
  }
}
