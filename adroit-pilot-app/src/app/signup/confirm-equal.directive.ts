import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqual]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualDirective,
    multi: true
  }]
})
export class ConfirmEqualDirective {
  @Input() appConfirmEqual: string;
  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {

    if (this.appConfirmEqual && this.appConfirmEqual !== control.value) {
      return {'notEqual': true};
    }
    return null;
  }

}
