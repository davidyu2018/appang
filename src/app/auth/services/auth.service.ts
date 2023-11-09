import { Injectable } from '@angular/core';
import {Auth, User, Captcha} from './model'
import { Observable, of, ReplaySubject, defer, interval, from } from 'rxjs';
import { filter, map, mergeMap, take, startWith, delay } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import sso from '../../../assets/configs/config-info'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = {loginname: '', token: '', password: '', redirectUrl: ''};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private user: UserProfileService) { 
    sso.osso && this.loginWithCredentials({loginname:'', token: '', password:''}, sso.url).subscribe(() => {})
    const cuser=  JSON.parse(localStorage.getItem('AUTH_LOGIN') || 'null') 
    const currauth = cuser ? cuser : {loginname: '', token: '', redirectUrl: ''}
    this.auth = Object.assign({}, this.auth,  currauth)
    this.subject.next(this.auth)
  }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable()
  }
  unAuth(): void {
    this.auth = Object.assign({}, this.auth, {loginname: '', token: '', redirectUrl: '' });
    localStorage.removeItem('AUTH_LOGIN')
    this.subject.next(this.auth)
  }
  loginWithCredentials(loginfo: Auth, osso: string = ''): Observable<Auth> {
    return this.user.findUser(loginfo.loginname, loginfo.osso).pipe(
      map((res:any) => {
        console.log('auth-info', res)
        if (res.results) {
          const loginfo = res.results[0].login
          const loginname = loginfo.username
          const token = loginfo.uuid
          const password = loginfo.password
          const avatar = res.results[0].picture.medium
          this.auth = Object.assign({}, this.auth, {loginname, token, password, avatar})
        } else {
          this.auth = Object.assign({}, this.auth, {loginname: '', token: ''})
        }
        localStorage.setItem('AUTH_LOGIN', JSON.stringify(this.auth))
        this.subject.next(this.auth)
        return this.auth
      })
    )
  }
  register(user: User): Observable<User> {
    return of({name: 'zsf', id: 123, nickname: '', mobile: '', avatar: '', email: ''})
  }
  usernameExisted(val: string): Observable<any> {
    return of({existed: false})
  }
  emailExisted(val: string): Observable<any> {
    return of({existed: false})
  }
  mobileExisted(val: string): Observable<any> {
    return of({existed: false})
  }

  requestCaptcha(): Observable<Captcha> {
    return this.user.refreshCaptcha()
  }
  verifyCaptcha(token: string, code: string): Observable<any> {
    return this.user.verifyCaptcha(token, code)
  }
  requestSmsCode(mobile: string) {
    return of({})
  }
  verifySmsCode(mobile: string, code: string) {
    return of(mobile === '2435465' && code === '435465')
  }

}
