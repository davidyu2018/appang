import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() menu: any 
  @Output()  onMenuEvent = new EventEmitter<any>()
  constructor(){}
  menuHandler(menu: any, $event: any) {
    console.log(menu)
    $event.stopPropagation()
    this.onMenuEvent.emit(menu)
  }
}
