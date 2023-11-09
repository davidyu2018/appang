import { ProductRepository } from '../sports/product.repository';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { RestDataSource } from '../sports/rest.datasource'
@Injectable()
export class DataResolver {
  constructor(private model: ProductRepository, private dataSource: RestDataSource) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | null {
    return this.model.getProducts().length == 0 ? this.dataSource.getProducts() : null;
  }
}