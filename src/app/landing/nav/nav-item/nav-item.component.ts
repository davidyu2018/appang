import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() nav: any 
  @Output()  onMenuEvent = new EventEmitter<any>()
  constructor(){}
  menuHandler(menu: any, $event: any) {
    console.log(menu)
    $event.stopPropagation()
    this.onMenuEvent.emit(menu)
  }
}
