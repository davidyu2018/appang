// import { Directive, TemplateRef, Input, Attribute, SimpleChanges, ElementRef } from "@angular/core";
// @Directive({
//   selector: "[add-class]"
// })
// export class AddClasAttrDirective {
//   constructor(public element: ElementRef, @Attribute("add-class") addClass: string) {
//     element.nativeElement.classList.add(addClass || "bg-success", "text-white")
//   }
// }
// 上面是指令属性值是静态数据写法

// 下面是指令属性值是动态值写法
import { Directive, TemplateRef, Input, Attribute, SimpleChanges, ElementRef, Output, EventEmitter } from "@angular/core";
import { Event } from "@angular/router";
@Directive({
  selector: "[add-class]"
})
export class AddClassDirective {
  @Input("add-class")
  addClass: string = '';
  constructor(private element: ElementRef) {
    this.element.nativeElement.addEventListener('click', (e: Event) => {
      if (this.product != null) {
        this.click.emit(this.product.category)
      }
    })
  }
  @Input("pa-product")
  product: any;
  @Output("pa-category")
  click = new EventEmitter<string>()

  ngOnInit() {
    this.element.nativeElement.classList.add(this.addClass || "bg-success", "text-white")
  }
  /// 下面方法是 响应输入属性德变化（若实时输入。效果没有生效）
  // ngOnChange(changes: {[property: string]: SimpleChanges}) {
  //   let change = changes["addClass"];
  //   let classList = this.element.nativeElement.classList;
  //   if (!change.isFirstChange() && classList.contains(change.previousValue)) {
  //     classList.remove(change.previousValue)
  //   }
  //   if (!classList.contains(change.currentValue)) {
  //     classList.add(change.currentValue)
  //   }
  // }
}