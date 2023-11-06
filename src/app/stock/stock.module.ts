import { NgModule } from '@angular/core';
import { routing } from './stock-routing.module'
import { StockComponent } from './stock.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    routing,
    ShareModule
  ]
})
export class StockModule { }
