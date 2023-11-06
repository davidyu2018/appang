import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    // canActivate: [AuthGuardService],
    // canActivateChild: [AuthGuardService], // 针对自己的第一层子路由的拦截
    children: [
      {
        path: 'stock',
        loadChildren: () => import('../stock/stock.module').then(m => m.StockModule) // 懒加载模块 通常放在 模糊匹配路由之前
      },
      {
        path: 'todo',
        redirectTo: 'todo/ALL',
      },
      {
        path: 'todo/:filter', 
        // canLoad 守卫懒加载模块 阻止异步加载的模块 看不到源码。
        loadChildren: () => import('../todo/todo.module').then(m => m.TodoModule) // 懒加载模块 通常放在 模糊匹配路由之前
      }
    ]
  }, 
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
