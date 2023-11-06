import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Todo} from '../todo.model'
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  _todos: Todo[] = []
  @Input() // 把输入变量todos 做成set/get修饰的属性方法是因为若来自父组件的变量改变了，子组件能更新本身的内容。
  set todos(todos: Todo[] | null) {
    this._todos = todos ? [...todos] : []
  }
  get todos() {
    return this._todos
  }
  @Output() onRemoveTodo = new EventEmitter<Todo>()
  @Output() onToggleTodo = new EventEmitter<Todo>()
  @Output() onToggleAll = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }
  removeTriggered(todo: Todo) {
    this.onRemoveTodo.emit(todo)
  }
  toggleTriggered(todo: Todo) {
    this.onToggleTodo.emit(todo)
  }
  toggleAllTriggered() {
    this.onToggleAll.emit(true);
  }
}
