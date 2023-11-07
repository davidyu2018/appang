import { NgModule } from '@angular/core';
import { routing } from './stock-routing.module'
import { StockComponent } from './stock.component';
import { ShareModule } from '../share/share.module';
import { StockItemComponent } from './stock-item/stock-item.component';



@NgModule({
  declarations: [
    StockComponent,
    StockItemComponent
  ],
  imports: [
    routing,
    ShareModule
  ]
})
export class StockModule { }
