import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators'
import { Observable, of,Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProductEditorComponent } from '../../admin/product-editor.component'

@Injectable({
  providedIn: 'root'
})
export class MenusLoadedGuardService {
  private loaded: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (route.params['mode'] == 'create') {
      return new Promise<boolean>((resolve) => {
        let respons: [string, () => void][] = [["Yes", () => resolve(true)], ["No", () => resolve(false)]];
        return (window.confirm("Do you accept the terms & conditions")) ? resolve(true) : resolve(false)
      })
    } else {
      return true
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    if (route.url.length > 0 && route.url[route.url.length - 1].path == 'sports') {
      return true
      // return this.authService.loadMenus().pipe(map((ms) => {
      //   ms.length > 0 && this.router.navigate(['/landing'])
      //   return ms.length > 0
      // }))
      // return new Promise<boolean>((resolve, reject) => {
      //   let tof = window.confirm("Do you accept the terms & conditions")
      //   !tof && (this.router.navigate(['/landing']))
      //   return tof ? resolve(true) : resolve(false)
      // })
    } else {
      return true
    }

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | null {
    return null
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.loaded || new Promise<boolean>((resolve, reject) => {
      let tof = window.confirm("Do you accept the terms & conditions")
      !tof && (this.router.navigate(['/landing']))
      return tof ? resolve(true) : resolve(false)
    })
  }
  canDeactivate(component: ProductEditorComponent, route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log('ccccccccccccc', component)
    if (component) {
      if (
        ["name", "category", "price"]
        // .some((prop:string) => component.product[prop] != component.originalProduct[prop])
      ) {
        let subject = new Subject<boolean>();
        let responses: [string, (string: string) => void][] = [
          ["Yes", () => {
            subject.next(true);
            subject.complete();
          }],
          ["No", () => {
            this.router.navigateByUrl(this.router.url);
            subject.next(false);
            subject.complete();
          }]
        ];
        alert('Discard change?');
        return subject;
      }
    }
    return true;
  }
}
