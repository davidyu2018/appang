import { Component } from '@angular/core';
import { User } from '../../services/model';
import { AuthService } from '../../services/auth.service';
import { take, switchMap, catchError, startWith, tap, withLatestFrom, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncValidatorFn } from '@angular/forms';
// import {RegisterValidator} from '../../validators/register.validator'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // usernameValidator: AsyncValidatorFn;
  // emailValidator: AsyncValidatorFn;
  // mobileValidator: AsyncValidatorFn;

  constructor(private auth: AuthService, private router: Router) {
    // this.usernameValidator = RegisterValidator.validateUniqueUsername(auth)
    // this.emailValidator = RegisterValidator.validateUniqueEmail(auth)
    // this.mobileValidator = RegisterValidator.validateUniqueMobile(auth)

  }
  processRegister(user: User) {
    this.auth.register(user).pipe(take(1)).subscribe((u: any) => console.log(u))
    this.router.navigate(['/auth/login'])
  }
}
