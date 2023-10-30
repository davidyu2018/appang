import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { LoginComponent } from './login/login.component'
const routes: Routes = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: LoginComponent
  },
  {
    path: 'auth/forgot',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
