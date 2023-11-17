import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Captcha } from './model';

@Injectable({
  providedIn: 'root'
})
 
export class UserProfileService {

  constructor(private http: HttpClient) { }

  findUser(id: string, oos=''): Observable<any> { // in fact just login
    // https://randomuser.me/api/    //User
    // http://jsonplaceholder.typicode.com/posts // comments get ->query post -> add
    // http://jsonplaceholder.typicode.com/posts/2
    const url = oos ? oos : `https://randomuser.me/api/`;
    return this.http.get(url)
  }
  refreshCaptcha(): Observable<any> {
    const url = 'https://api.thecatapi.com/v1/images/search?limit=1'
    return this.http.get(url).pipe(
      map((res: any) => ({captcha_token: res[0].id, captcha_url: res[0].url}))
    )
    // return of({ captcha_token: 'bdgfhf', captcha_url: url })
  }
  verifyCaptcha(token: string, code: string): Observable<any> {
    return of({ validate_token: 'okkk' })
  }
  
}
