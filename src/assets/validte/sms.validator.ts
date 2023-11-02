import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../app/auth/auth.service";
import { map } from 'rxjs/operators'
export class SmsValidator {
  static validateSmsCode(service: AuthService) {
    return (control: AbstractControl) => {
      const val = control.value;
      if (!val.mobile || !val.code) {
        throw new Error('SmsValidator: 没有找到手机号或验证码');
      }
      return service.verifySmsCode(val.mobile, val.code).pipe(
        map(res => res ? null : { codeInvalid: true })
      )
    }
  }
  static cannotControl(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true }
    }
    return null;
  }
}
