import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  @Input() itemCount: number = 0;
  @Output() onClearAll = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }
  clearAllCompleted() {
    this.onClearAll.emit(true)
  }
}
