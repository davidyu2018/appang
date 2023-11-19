import { Component ,Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() navs: any[] = []
  @Output()  onNavEvent = new EventEmitter<any>()
  constructor() {

  }
  navHandler(nav: any) {
    this.onNavEvent.emit(nav)
  }
}
