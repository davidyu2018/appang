import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() navs: any[] | null = []
  constructor(private router: Router) {

  }
  onMenuEvent(evt: any) {
    this.router.navigate([evt.path, evt.param])
  }
}
