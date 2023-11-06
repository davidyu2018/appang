import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'forgot-password-form',
  templateUrl: './forgot-password-form.html'
})
export class ForgotPasswordFormComponent implements OnInit {
  @Input() mobile: string | null = null;
  @Input() codeValidator?: ValidatorFn;
  @Output() submitPassword = new EventEmitter<string>();
  @Output() requestCode = new EventEmitter<string>();
  @Output() mobileInputEvent = new EventEmitter<string>();
  mobileForm: FormGroup;
  newPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.mobileForm = this.fb.group({
      oldCode: [this.mobile, Validators.required, this.codeValidator]
    })
    this.newPasswordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      repeat: ['', [Validators.required, this.matchPassword('password')]]
    })
  }
  ngOnInit() { 
   }
  submit(form: FormGroup, ev: Event) {
    if (!form.valid || !form.value) {
      return;
    }
    if (form.value.password) {
      this.submitPassword.emit(form.value.password)
    }
  }
  makeRequest(mobile: any) {
    console.log('请求发送验证码到', mobile)
    this.requestCode.emit(mobile)
  }
  matchPassword(otherCtrlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherCtrlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchPassword(): 未发现表单中有要比较的控件')
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity()
        })
      }
      if (!otherControl) {
        return null;
      }
      if (otherControl.value !== thisControl.value) {
        return { matchOther: true }
      }
      return null;
    }
  }
  mobileInput(mobile: any) {
    this.mobileInputEvent.emit(mobile)
  }
}