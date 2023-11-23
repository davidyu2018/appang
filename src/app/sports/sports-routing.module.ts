import { CheckoutComponent } from './cart/checkout.component';
import { CartDetailComponent } from './cart/cart-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SportsComponent } from './sports.component';
import { SportsFirstGuard } from './sports.guard'
import { AuthGuardService } from '../auth/services/auth-guard.service'
import { MenusLoadedGuardService } from '../auth/services/menus-loaded.service'
export const routes: Routes = [
  {
    path: '',
    component: SportsComponent,
    // canActivateChild: [MenusLoadedGuardService]
    // resolve: { auth: MenusResolver },
  },
  {
    path: 'cart',
    component: CartDetailComponent,
    canActivate: [SportsFirstGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [SportsFirstGuard]
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'products',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: "products/:mode/:id", component: ProductEditorComponent
  //     },
  //     {
  //       path: "products/:mode", component: ProductEditorComponent
  //     },
  //     {
  //       path: "products", component: ProductTableComponent
  //     },
  //     {
  //       path: "orders", component: OrderTableComponent
  //     }
  //   ]
  // }
];

export const routing = RouterModule.forChild(routes)