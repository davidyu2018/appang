import { Component, Output, Input, EventEmitter } from '@angular/core';
import { User } from '../../services/model';
import { ValidationErrors, AbstractControl, FormBuilder, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { emailPattern, mobilePattern } from '../../validators/regex';
import { AuthService } from '../../services/auth.service';
import {RegisterValidator} from '../../validators/register.validator'
import * as _ from 'lodash'
import { UsernameValidator } from 'src/app/auth/validators';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Output() onRegister = new EventEmitter();
  @Input() avatars:string[] = [];
  usernameValidator: AsyncValidatorFn;
  emailValidator: AsyncValidatorFn;
  mobileValidator: AsyncValidatorFn;  

  form: FormGroup;
  private readonly avatarName = './assets/images/avatars/avatar'
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.usernameValidator = RegisterValidator.validateUniqueUsername(auth)
    this.emailValidator = RegisterValidator.validateUniqueEmail(auth)
    this.mobileValidator = RegisterValidator.validateUniqueMobile(auth)
    this.form = this.fb.group({
      loginname: [
        '',
        [
          Validators.required, Validators.minLength(3), Validators.maxLength(20), UsernameValidator.cannotContainSpace
        ],
        this.usernameValidator
      ],
      mobile: [
        '',
        [Validators.required, Validators.pattern(mobilePattern())],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(emailPattern())],
      ],
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      repeat: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      avatar: ['', Validators.required],
      // password: this.fb.group(
      //   {
      //     password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      //     repeat: ['', [Validators.required]]
      //   }
      // )
    });
  }
  ngOnInit() {
    this.avatars = _.range(1, 9).map((i: number) => `${this.avatarName}-${i}.svg`)
    .reduce((r: string[], x: string) => [...r, x], [])
  }
  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeat = control.get('repeat')?.value;
    if (password !== repeat) {
      control.get('repeat')?.setErrors({ notMatchPassword: true })
      return { notMatchPassword: true }
    }
    return null
  }
  onSubmit({valid, value}: FormGroup, ev: Event) {
    if (!valid) return;
    const user: User = {
      nickname: value.loginname,
      id: 0,
      name: value.loginname,
      password: value.password.password,
      email: value.mobile,
      avatar: value.avatar
    }
    this.onRegister.emit(user)
  }

}
