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

  findUser(id: string): Observable<User> { // in fact just login
    const url = 'https://jsonplaceholder.typicode.com/todos/' + id;
    return this.http.get(url).pipe(
      map((res: any) => res.json() as User)
    )
  }
}
