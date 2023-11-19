import {Directive, HostListener, SimpleChanges, HostBinding} from '@angular/core';

@Directive({
    selector: '[inputRef]'
})
export class InputRefDirective {

    focus = false;

    @HostListener('focus')
    onFocus() {
        this.focus = true;
    }

    @HostListener('blur', ['$event.target'])
    onBlur() {
        this.focus = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changng', changes)
      }
}