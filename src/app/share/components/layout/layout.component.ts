import { Component ,Input} from '@angular/core';
import { LayoutService } from 'src/app/core/layout.service';
import { Observable, of } from 'rxjs';
import {filter} from 'rxjs/operators'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() asideBar: any[] = []
  toRight$: Observable<boolean>;
  constructor(private layoutService: LayoutService) {
    // this.ngClass = {'to-right': true}
    this.toRight$ = this.layoutService.getLayoutOption.pipe(filter(x => x['SIDEBAR_RIGHT']))
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    
  }

}
