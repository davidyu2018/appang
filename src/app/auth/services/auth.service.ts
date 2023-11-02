import { Injectable } from '@angular/core';
import {Auth, Loginfo, User} from './model'
import { Observable, of, ReplaySubject, defer, interval, from } from 'rxjs';
import { filter, map, mergeMap, take, startWith, delay } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import sso from '../../../assets/configs/config-info'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = {user: null, errMsg: '', redirectUrl: ''};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private user: UserProfileService) { 
    sso.osso && this.loginWithCredentials({loginname: '', password: '', osso: sso.url}).subscribe(() => {})
    const cuser=  JSON.parse(localStorage.getItem('AUTH_LOGIN') || 'null') 
    const currauth = cuser ? cuser : {user: null, errMsg: '', redirectUrl: ''}
    this.auth = Object.assign({}, this.auth,  currauth)
    this.subject.next(this.auth)
    console.log('init auth', this.auth)
  }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable()
  }
  unAuth(): void {
    this.auth = Object.assign({}, this.auth, {user: null, errMsg: 'Not logged in!', redirectUrl: '' });
    localStorage.removeItem('AUTH_LOGIN')
    this.subject.next(this.auth)
  }
  loginWithCredentials(loginfo: Loginfo): Observable<Auth> {
    return this.user.findUser(loginfo.loginname, loginfo.osso).pipe(
      map((res:any) => {
        if (res.code !== '0') {
          this.auth = Object.assign({}, this.auth, {user: null, errMsg: 'User not found'})
        } else {
          this.auth = Object.assign({}, this.auth, {user: res.content, errMsg: res.message})
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
}
