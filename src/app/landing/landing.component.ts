import { Component } from '@angular/core';
import { filter, map, mergeMap, take, startWith, delay, share } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SignInService } from '../auth/services/sign-in.service';
import { LayoutService } from '../core/layout.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent {
  navs$: Observable<any[]>;
  fixWidth$: Observable<boolean>
  showLoading$: Observable<boolean>
  constructor(private signService: SignInService, private layoutService: LayoutService) {
  }
  
  ngOnInit() {
    this.showLoading$ = this.layoutService.showLoading
    this.navs$ = this.signService.getMenus().pipe(share()) // if this is nesscery auth , put in if stantence above
  }
  ngAfterViewInit() {
    
  }
  ngAfterContentInit() {
    
  }
  
}
