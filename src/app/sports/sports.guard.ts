import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { SportsComponent } from "./sports.component";
@Injectable()
export class SportsFirstGuard {
  private firstNavigation = true;
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (route.component != SportsComponent) {
        this.router.navigateByUrl('/landing/sports')
        return false
      }
    }
    return true
  }
}