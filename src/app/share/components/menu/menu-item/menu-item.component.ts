import { Component, Input, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() menu: any = {};
  @Output()  onNavItemEvent = new EventEmitter<any>()
  constructor() {}
  navItemHandler(nav: any) {
    this.onNavItemEvent.emit(nav)
  }
}
