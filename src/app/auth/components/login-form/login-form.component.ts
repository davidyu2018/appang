import { Component, Output ,Input, EventEmitter} from '@angular/core';
import  { Auth } from '../../services/model'
import {passwordPattern} from '../../validators'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  needCaptcha: boolean = false;
  @Input() captchaUrl: string | undefined = '';
  @Output() onLogin =  new EventEmitter<Auth>()

  @Output() refreshCaptcha = new EventEmitter<void>()
  @Output() codeInput = new EventEmitter<string>()
  constructor() { 
   }
  onSubmit(formValue: any) {
    this.onLogin.emit(formValue)
  }
  processClick() {
    this.refreshCaptcha.emit()
  }
  verifyCaptcha(code: string) {
    this.codeInput.emit(code)
  }
  getValidationMessage(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let message: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            message.push(`You must enter a ${thing}`)
            break;
          case 'minlength':
            message.push(`A ${thing} must be at least ${state.errors['minlength'].requiredLength} characters`);
            break;
          case "pattern":
            message.push(`The ${thing} contains illegal characters`);
            break;
        }
      }
    }
    return message;
  }
}
