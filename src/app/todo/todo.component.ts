import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Todo } from './todo.model'
import { TodoService } from './todo.service'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private route: ActivatedRoute, private service: TodoService) {

  }

  ngOnInit(): void {
    // 如果组件只加载一次，且只从它导航到另一个组件或路由时没有问题，但要是使用不同的参数加载同一个组件，就不要用快照
    // 相反可以将参数和查询参数当成Observable就像调HTTP请求一样，每次URL更改都会触发订阅，会重新加载数据。
    this.route.params.pipe(map(v => v['filter'])).subscribe(filter => { 
      this.service.filterTodos(filter)
      this.todos$ = this.service.todos
    })
  }

  addTodo(desc: string) {
    this.service.addTodo(desc)
  }
  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo)
  }
  removeTodo(todo: Todo) {
    this.service.deleteTodo(todo)
  }

  toggleAll() {
    this.service.toggleAll();
  }
  clearAllCompleted() {
    this.service.clearCompleted()
  }
}
