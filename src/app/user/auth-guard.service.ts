import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SocialAuthService } from './social-auth.service';
import { Auth } from './model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: SocialAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.auth.getAuth().pipe(
      map((auth: Auth) => {
    console.log('111111111111111111111')
        if(!auth.user ){
          this.router.navigate(['/auth'])
        } 
        return !!auth.user
      })
    )
  }
}
