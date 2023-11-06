import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module'
import { routing } from './todo-routing.module'
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';



@NgModule({
  declarations: [TodoComponent, TodoFooterComponent, TodoHeaderComponent, TodoListComponent, TodoItemComponent],
  imports: [
    ShareModule,
    routing
  ],
  providers: [TodoService]
})
export class TodoModule { }
