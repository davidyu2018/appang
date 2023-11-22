import { Component ,Input, ElementRef, ViewChild} from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { Observable, of } from 'rxjs';
import {filter, tap, map} from 'rxjs/operators'
// import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() asideBar: any[] = []
  toRight$: Observable<boolean>;
  fixHeader$: Observable<any>;
  collapse$: Observable<boolean>
  constructor(private layoutService: LayoutService) {}
  ngOnInit() {
    this.toRight$ = this.layoutService.getLayoutOption.pipe(map(x => x['SIDEBAR_RIGHT']))
    this.fixHeader$ = this.layoutService.getLayoutOption.pipe(map(x => x['FIXED_HEADER']))
    this.collapse$ = this.layoutService.getLayoutOption.pipe(map(x => x['SIDEBAR_COLLAPSE']))
  }
}
