import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePicker),
      multi: true
    },
    // {
    // 这个放开后这个自定义控件总会监测验证器
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => ImagePicker),
    //   multi: true
    // }
  ]
})
export class ImagePicker implements ControlValueAccessor {
  selected: string | null = './assets/images/icons/user.svg';
  perGridWidth: string = ''
  show: boolean = false
  num: number = 6;
  // @Input() title = 'Choose photo:';
  @Input()
  set cols(col: number) {
    this.perGridWidth = (100 / col) + '%'
  };
  @Input() items: string[] = [];
  @Input() itemWidth = '3em';
  @Output('itemChange') itemChange = new EventEmitter<string>()
  constructor() {
    this.perGridWidth = (100 / this.num) + '%'
  }
  // 做个空函数体，真正使用的方法在registerOnChange中，由框架注册，然后使用它把变化发回表单。
  private propagateChange = (_: any) => { };
  // 写入控件值
  public writeValue(obj: any) {
    // 外部写入控件值时会调用此方法
    this.selected = obj ? String(obj) : null;
  }
  // 当表单控件改变时，函数FN会被调用，也是把变化发送回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn
  }
  // 验证表单，验证结果正确则返回null，否则返回一个验证结果对象
  public validate(c: FormControl) {
    console.log('ccccccc', c)
    return this.selected ? null : { imageListSelect: { valid: false } }
  }
  // 这里没有使用，用于注册touched状态。
  public registerOnTouched() {
    // 这个函数中传入的是值变化的回调函数FN，要在本地保存它的引用（this.propagateChange = fn),并在控件值变化时调用它，将值传递出去
  }
  // 列表元素选择发送改变触发。
  selectImage(i: number) {
    this.selected = this.items[i];
    this.propagateChange(this.items[i]);
    this.itemChange.emit(this.items[i])
    this.show= false
  }
  toggle() {
    this.show = !this.show
  }
}