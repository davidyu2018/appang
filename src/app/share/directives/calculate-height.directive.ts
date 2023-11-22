import {Directive,Input, HostListener, SimpleChanges, HostBinding, Attribute, ElementRef} from '@angular/core';

@Directive({
    selector: '[fixHeader]'
})
export class CalcHeightDirective {

    @Input() fixHeader: boolean = false;
    constructor(private eleRef: ElementRef, @Attribute('pa-attr') fixHeader: boolean) {

    }
    @HostListener('window:resize')
    onSize() {
        this.setElemHeight(this.fixHeader)
    }
    ngOnInit() {
        // this.setElemHeight(this.fixHeader)
    }
    ngAfterViewInit() {
        setTimeout(() => this.setElemHeight(this.fixHeader), 30)
    }
    ngOnChanges(changes: SimpleChanges) {
        let change = changes['fixHeader'];
        // console.log('changng-------', change)
        !change.firstChange && this.setElemHeight(change.currentValue)
    }
    setElemHeight(isFix: boolean) {
        const winHeight = window.innerHeight
        const hEle = document.querySelector('.c-header') 
        const hH = hEle ? hEle.clientHeight : 0
        const mEle = document.querySelector('.c-nav')
        const nH = mEle ? mEle.clientHeight : 0
        const getHeight = winHeight - hH - nH - 12
        const setStyles = isFix ? `height: ${getHeight}px` : 'height: auto'
        this.eleRef.nativeElement.setAttribute('style', setStyles)
    }
}