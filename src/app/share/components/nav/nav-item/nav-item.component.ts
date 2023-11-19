import { Component, Input, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() nav: any = {};
  @Output()  onNavItemEvent = new EventEmitter<any>()
  constructor() {}
  navItemHandler(nav: any) {
    this.onNavItemEvent.emit(nav)
  }
}
