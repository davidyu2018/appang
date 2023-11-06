import { Component, Output ,Input, EventEmitter} from '@angular/core';
import  { Auth } from '../../services/model'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginfo: Auth = {loginname: '', password: '', token:''};
  @Input() captchaUrl: string | undefined = '';
  @Output() onLogin =  new EventEmitter<Auth>()

  @Output() refreshCaptcha = new EventEmitter<void>()
  @Output() codeInput = new EventEmitter<string>()
  constructor() {  }
  loginSubmit(loginForm: any) {
    this.loginfo = {...loginForm.value.loginform}
    this.onLogin.emit(this.loginfo)
  }
  processClick() {
    this.refreshCaptcha.emit()
  }
  verifyCaptcha(code: string) {
    this.codeInput.emit(code)
  }
}
