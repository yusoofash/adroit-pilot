import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader = new Subject<boolean>();
  public _loader$ = this.loader.asObservable();

  constructor() { }

  startLoader() {
    this.loader.next(true);
  }

  stopLoader() {
    this.loader.next(false);
  }
}
