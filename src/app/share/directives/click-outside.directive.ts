import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output() 
  public clickOutside = new EventEmitter()
  @HostListener('document:click', ['$event.target'])

  public onClick(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement)
    const isMapId = targetElement.id ? targetElement.id.indexOf('OUTSIDE_CLICK_') > -1 : false
    !clickedInside && !isMapId && this.clickOutside.emit(true)
  }
}
