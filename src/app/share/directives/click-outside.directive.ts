import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() 
  public clickOutside = new EventEmitter()
  
  constructor(private _elementRef: ElementRef) { }

  
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement)
    const isMapId = targetElement.id ? targetElement.id.indexOf('OUTSIDE_CLICK_') > -1 : false
    !clickedInside && !isMapId && this.clickOutside.emit(true)
  }

  @HostListener('window:resize', ['$event.target'])
  public resizeView(te: any) {
    console.log('resize', te)
  }
}
