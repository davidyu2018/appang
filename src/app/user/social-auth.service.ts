import { Injectable } from '@angular/core';
import {Auth} from './model'
import { Observable, of, ReplaySubject, defer, interval, from } from 'rxjs';
import { filter, map, mergeMap, take, startWith, delay } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  auth: Auth = {user: null, errMsg: '', redirectUrl: ''};
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);
  constructor(private user: UserProfileService) { 
    const cuser=  JSON.parse(localStorage.getItem('AUTH_LOGIN') || 'null') 
    cuser && (this.auth = Object.assign({}, this.auth,  cuser))
    this.subject.next(this.auth)
    console.log('yuanben', this.auth)
  }

  getAuth(): Observable<Auth> {
    return this.subject.asObservable()
  }
  unAuth(): void {
    this.auth = Object.assign({}, this.auth, {user: null, errMsg: 'Not logged in!', redirectUrl: '' });
    this.subject.next(this.auth)
  }
  loginWithCredentials(login: string, password: string): Observable<Auth> {
    return this.user.findUser(login).pipe(
      map(res => {
        if (!res) {
          this.auth = Object.assign({}, this.auth, {user: null, errMsg: 'User not found'})
        }
        this.auth = Object.assign({}, this.auth, {user: res})
        localStorage.setItem('AUTH_LOGIN', JSON.stringify(this.auth))
        this.subject.next(this.auth)
        return this.auth
      })
    )
  }
}
