import { Component, Output, Input, EventEmitter } from '@angular/core';
import { User } from '../../services/model';
import { ValidationErrors, AbstractControl, FormBuilder, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { emailPattern, mobilePattern } from '../../../../assets/validte/regex';
import { AuthService } from '../../services/auth.service';
import {RegisterValidator} from '../../validators/register.validator'
import * as _ from 'lodash'
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
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
        'Nicholas',
        [
          Validators.required, Validators.minLength(3), Validators.maxLength(20)
        ],
        this.usernameValidator
      ],
      mobile: [
        '13528867965',
        [Validators.required, Validators.pattern(mobilePattern())],
      ],
      email: [
        'eryt@qq.com',
        [Validators.required, Validators.pattern(emailPattern())],
      ],
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      avatar: ['', Validators.required],
      passwords: this.fb.group(
        {
          password: ['111111111', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
          repeat: ['111111111', [Validators.required]]
        },
        {
          validator: this.matchPassword
        }
      )
    });
  }
  ngOnInit() {
    this.avatars = _.range(1, 9).map((i: number) => `${this.avatarName}-${i}.png`)
    .reduce((r: string[], x: string) => [...r, x], [])
    console.log('kkk',this.avatars)


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
    this.onRegister.emit(value)
  }

}
