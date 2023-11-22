import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, Route, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { ProductEditorComponent } from '../../admin/product-editor.component'
@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard {
  constructor(private router: Router) {
  }
  canDeactivate(component: ProductEditorComponent, route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (component.mode = 'editing') {
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
