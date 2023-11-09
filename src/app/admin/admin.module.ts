import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module'
import { ProductRepository } from '../sports/product.repository'
import { RestDataSource } from '../sports/rest.datasource';
import { AddClassDirective } from '../sports/addclass-attr.directive'
import { routing } from './admin-routing.module'
import { ProductEditorComponent } from './product-editor.component';
import { ProductTableComponent } from './product-table.component';
import { OrderTableComponent } from './order-table.component';
import { AdminComponent } from './admin.component';
import { OrderRepository } from '../sports/order.repository';
import { DataResolver } from "../core/data-resover.service"

@NgModule({
  declarations: [
    ProductEditorComponent,
    ProductTableComponent,
    OrderTableComponent,
    AdminComponent,
    AddClassDirective
  ],
  imports: [
    ShareModule,
    routing
  ],
  providers: [DataResolver, ProductRepository, RestDataSource, OrderRepository]
})
export class AdminModule { }
