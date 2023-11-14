import { Component, Input, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, share } from 'rxjs/operators';
@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {
  inputValue: string = ''
  @Input() placeholder: string = 'what needs to be done?';
  @Input() delay: number = 300;
  @Output() onTextChange = new EventEmitter<string>()
  @Output() onEnterUp = new EventEmitter<string>()
  constructor(private elementRef: ElementRef) {
    // const event$ = fromEvent(this.elementRef.nativeElement, 'keyup')
    // event$.pipe(map(() => this.inputValue), debounceTime(this.delay), distinctUntilChanged(), share())
    //   .subscribe((input: string) => {
    //     console.log(input)
    //     // this.onTextChange.emit(input)

    //   })
  }

  ngOnInit(): void {
  }
  enterUp() {
    this.onEnterUp.emit(this.inputValue)
    this.inputValue = ''
  }
  onSearch(evt: any) {
    console.log('at latest search:', evt)
  }
}
