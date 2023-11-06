import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() menus: any[] | null = []
  constructor(private router: Router) {

  }
  onMenuEvent(evt: any) {
    this.router.navigate([evt.path, evt.param])
  }
}
