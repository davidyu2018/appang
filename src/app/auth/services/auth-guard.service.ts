import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Auth } from './model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private socialAuth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.socialAuth.getAuth().pipe(
      map((auth: Auth) => {
        if(!auth.token ){
          this.router.navigate(['/auth'])
        } 
        return !!auth.token
      })
    )
  }
}