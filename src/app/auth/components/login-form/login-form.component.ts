import { Component, Output ,EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import  { Loginfo } from '../../../user/model'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  langs = ['en', 'zh']
  loginfo: Loginfo = {loginname: '', password: ''};
  @Output() refreshCaptcha = new EventEmitter<void>()
  @Output() codeInput = new EventEmitter<string>()
  @Output() onLogin =  new EventEmitter<Loginfo>()
  constructor(public translate: TranslateService) {
      const browserLang = translate.getBrowserLang();
      const cussetlan = localStorage.getItem('SET_LANGAGE')
      translate.addLangs(this.langs)
      translate.use(cussetlan ? cussetlan : browserLang?.match(/en|zh/) ? browserLang : 'en');
      
  }
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
