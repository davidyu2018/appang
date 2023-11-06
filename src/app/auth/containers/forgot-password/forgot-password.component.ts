import { Component, OnInit } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { take } from 'rxjs/operators'
import { SmsValidator } from '../../../../assets/validte/sms.validator'
@Component({
  selector: 'forgot-password',
  styleUrls: ['../login/login.component.scss'],
  templateUrl: './forgot-password.component.html',
})

export class ForgotPasswordComponent implements OnInit {
  mobile: string | null = '';
  codeValidator: AsyncValidatorFn;
  constructor(private service: AuthService) {
    this.codeValidator = SmsValidator.validateSmsCode(service)
  }
  ngOnInit() {

  }
  processCodeRequest(mobile: any) {
    this.service.requestSmsCode(mobile).pipe(take(1)).subscribe(val => console.log(val))
  }
  processPassword(password: any) {
    console.log(password)
  }
  processMobile(mobile: string) {
    console.log('input mobile', mobile)
  }
}