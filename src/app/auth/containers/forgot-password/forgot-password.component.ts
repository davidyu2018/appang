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
  mobile: string | null = '13528867965';
  steps: any[] = [];
  currStep: number;
  codeValidator: AsyncValidatorFn;
  constructor(private service: AuthService) {
    this.codeValidator = SmsValidator.validateSmsCode(service)
  }
  ngOnInit() {
    this.steps = [{text: "验证绑定手机", icon: "mobile.svg"}, {text: "设置新密码", icon: "user.svg"}, {text: "完成", icon: "user.svg"}]
    this.currStep = 1;
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