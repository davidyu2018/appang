import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomvalidationService } from '../../core/customvalidation.service'
@Directive({
  selector: '[appPasswordPattern]'
})
export class PasswordPatternDirective {

  constructor(private customValidator: CustomvalidationService) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.customValidator.patternValidator()(control)
  }

}
