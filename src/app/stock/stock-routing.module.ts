import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';
export const routes: Routes = [
  {
    path: '',
    component: StockComponent,
  },
];

export const routing = RouterModule.forChild(routes)