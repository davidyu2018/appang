import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Todo } from './todo.model';
@Injectable()
export class TodoService {
  private api_url = 'http://jsonplaceholder.typicode.com/todos'
  private dataStore: { todos: Todo[] }
  private _todos: BehaviorSubject<Todo[]>;
  constructor(private http: HttpClient) {
    this.dataStore = { todos: [] }
    this._todos = new BehaviorSubject<Todo[]>([])
  }
  get todos() {
    return this._todos.asObservable()
  }
  getTodos() {
    this.http.get(this.api_url).pipe(
      map(res => res as Todo[]),
      // tap(evt => console.log('tap-evt', evt))
    ).subscribe(todos => this.updateStoreAndSubject(todos))
  }
  filterTodos(filter: string) {
    switch(filter) {
      case 'ACTIVE':
        this.http.get(`${this.api_url}?completed=false`).pipe(map((res: any) => res)).subscribe(todos => this.updateStoreAndSubject(todos));
        break;
        case 'COMPLETED':
          this.http.get(`${this.api_url}?completed=true`).pipe(map((res: any) => res)).subscribe(todos => this.updateStoreAndSubject(todos));
          break;
        default:
          this.getTodos()  
    }
  }
  addTodo(desc: string) {
    let timestap = new Date().toISOString()
    let todoToAdd = {
      id: timestap,
      desc: desc,
      completed: false
    }
    this.http.post('/todos', JSON.stringify(todoToAdd)).pipe(
      map(res => res as Todo)
    ).subscribe(todo => {
      this.dataStore.todos = [...this.dataStore.todos, todo];
      this._todos.next(Object.assign({}, this.dataStore).todos)
    })
  }
  toggleTodo(todo: Todo) {
    const url = `/todos/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    this.http.patch(url, JSON.stringify({ completed: !todo.completed })).subscribe(_ => {
      this.dataStore.todos = [...this.dataStore.todos.slice(0, i), updatedTodo, ...this.dataStore.todos.slice(i + 1)];
      this._todos.next(Object.assign({}, this.dataStore).todos)
    })
  }
  deleteTodo(todo: Todo) {
    const i = this.dataStore.todos.indexOf(todo);
    this.http.delete(`/todos/${todo.id}`).subscribe(_ => {
      this.dataStore.todos = [...this.dataStore.todos.slice(0, i), ...this.dataStore.todos.slice(i + 1)];
      this._todos.next(Object.assign({}, this.dataStore).todos)
    })
  }
  updateStoreAndSubject(todos: Todo[]) {
    this.dataStore.todos = [...todos];
    this._todos.next(Object.assign({}, this.dataStore).todos)
  }

  toggleAll() {
    this.dataStore.todos.forEach(todo => this.toggleTodo(todo));
  }
  clearCompleted() {
    this.dataStore.todos.filter(todo => todo.completed).forEach(todo => this.deleteTodo(todo))
  }
}