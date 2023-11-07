import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
export const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: '',
    outlet: 'whole',
    component: TodoComponent,
  }
];

export const routing = RouterModule.forChild(routes)