import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AuthGuardService } from '../user/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    // canActivate: [AuthGuardService],
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
