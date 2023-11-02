import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model';

@Injectable({
  providedIn: 'root'
})
 
export class UserProfileService {

  constructor(private http: HttpClient) { }

  findUser(id: string, oos=''): Observable<User> { // in fact just login
    const url = oos ? oos : `http://rap2api.taobao.org/app/mock/${id}/info`;
    return this.http.get(url).pipe(
      map((res: any) => res)
    )
  }
}
