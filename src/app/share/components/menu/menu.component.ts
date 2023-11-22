import { Component ,Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() menus: any[] = []
  @Output()  onNavEvent = new EventEmitter<any>()
  constructor() {

  }
  navHandler(nav: any) {
    this.onNavEvent.emit(nav)
  }
}
