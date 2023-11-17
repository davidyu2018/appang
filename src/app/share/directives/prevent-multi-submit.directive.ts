import { Attribute, Directive, ElementRef, HostListener ,Input, SimpleChange} from '@angular/core';

@Directive({
    selector: '[preventMultiSubmit]'
})

export class PreventMultiSubmitDirective {
    @Input('my-attr')
    bgClass: string
    constructor(private eleRef: ElementRef, @Attribute('pa-attr') bgClass: string) {
        eleRef.nativeElement.classList.add(bgClass || "bg-success", "text-white")
        // 如果 pa-attr 用 就增加 bg-success 和text-white 如果 pa-attr="xxxx" 用的话 就是 增加类 xxxx(也可以是表达式：[pa-attr]="xxx < 6 ? 'gfhf' : 'qwert'")
        // 如果输入性属性 那表达式里的变量发生改变后 指令是感应不到的。所以要在指令的生命函数里监听：
    }
    @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        console.log('domm', this.eleRef.nativeElement)
        const hostdom = this.eleRef.nativeElement
        hostdom.setAttribute('disabled', true);
        hostdom.classList.add('generate-loader')
        
    }
    ngOnChanges(changes: {[property: string]: SimpleChange}) {
        let change = changes['bgClass'];
        let classList = this.eleRef.nativeElement.classList;
        if (!change.isFirstChange() && classList.contains(change.previousValue)) {
            classList.remove(change.previousValue)
        }
        if (!classList.contains(change.currentValue)) {
            classList.add(change.currentValue)
        }
    }  
}