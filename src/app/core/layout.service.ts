import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, defer, interval, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  layoutOptions: any
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  subjectLoading$: ReplaySubject<any> = new ReplaySubject<boolean>(1);
  constructor() {
    const layoutStore = JSON.parse(localStorage.getItem('LAYOUT_OPTIONS') || 'null') 
    this.layoutOptions = layoutStore ? {...this.layoutOptions, ...layoutStore} : 
      { FIXED_WIDTH: false, SIDEBAR_RIGHT: false, FIXED_HEADER: false }
    this.subject$.next(this.layoutOptions)
  }
  get getLayoutOption() {
    return this.subject$.asObservable()
  }
  get showLoading() {
    return this.subjectLoading$.asObservable()
  }
  setLoading(value: boolean) {
    this.subjectLoading$.next(value)
  }
  setLayoutOption(option: any) {
    this.layoutOptions = {...this.layoutOptions, ...option}
    // console.log('dgfhg', this.layoutOptions)
    localStorage.setItem('LAYOUT_OPTIONS', JSON.stringify(this.layoutOptions))
    this.subject$.next(this.layoutOptions)
  }
}
