import { Injectable } from '@angular/core';
import {Auth, User, Captcha} from './model'
import { Observable, of, ReplaySubject, defer, interval, from } from 'rxjs';
import { filter, map, mergeMap, take, startWith, delay } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import sso from '../../../assets/configs/config-info'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = {loginname: '', token: '', password: '', redirectUrl: ''};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private user: UserProfileService, private router: Router) { 
    sso.osso && this.loginWithCredentials({loginname:'', token: '', password:''}, sso.url).subscribe(() => {})
    const cuser=  JSON.parse(localStorage.getItem('AUTH_LOGIN') || 'null') 
    const currauth = cuser ? cuser : {loginname: '', token: '', redirectUrl: ''}
    this.auth = Object.assign({}, this.auth,  currauth)
    this.subject.next(this.auth)
  }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable()
  }
  unAuth(url: string = ''): void {

    const curUrl = url ? url : this.router.url
    this.auth = Object.assign({}, this.auth, {loginname: '', token: '', redirectUrl: curUrl, avatar: '', password:'' });
    localStorage.setItem('AUTH_LOGIN', JSON.stringify(this.auth))
   
    !url && this.subject.next(this.auth)
    this.goLogin()
  }
  goLogin(url:string = '') {

    this.router.navigate(['/auth'])
  }
  loginWithCredentials(loginfo: Auth, osso: string = ''): Observable<Auth> {
    return this.user.findUser(loginfo.loginname, loginfo.osso).pipe(
      map((res:any) => {
        if (res.results) {
          const loginfo = res.results[0].login
          const nameSet = res.results[0].name
          const loginname = `${nameSet.first} ${nameSet.last}`
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
