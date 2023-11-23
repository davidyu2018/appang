import { Routes, RouterModule } from '@angular/router';
import { ProductEditorComponent } from './product-editor.component';
import { ProductTableComponent } from './product-table.component';
import { OrderTableComponent } from './order-table.component';
import { AdminComponent } from './admin.component';
import { UnsavedGuard } from "../auth/services/unsaved-guard.service"
import { DataResolver } from "../core/data-resover.service"
import { MenusLoadedGuardService } from '../auth/services/menus-loaded.service'
export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: "products/:mode/:id",
        component: ProductEditorComponent,
        // resolve: { data: DataResolver }
      },
      {
        path: "products/:mode",
        component: ProductEditorComponent,
        canActivate: [MenusLoadedGuardService]
      },
      {
        path: "products",
        component: ProductTableComponent,
      },
      {
        path: "orders",
        component: OrderTableComponent,
      }
    ]
  },
];

export const routing = RouterModule.forChild(routes)