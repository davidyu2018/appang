import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { Observable, Subscription, interval, fromEvent } from "rxjs";
import { debounceTime, filter, map, startWith, switchMap, takeWhile, tap } from 'rxjs/operators'
import { mobileErrorMsg, mobilePattern } from "../../../auth/validators/index";

@Component({
  selector: 'verify-mobile',
  templateUrl: './verify-mobile.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => VerifyMobileComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => VerifyMobileComponent), multi: true }

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyMobileComponent implements ControlValueAccessor, OnDestroy {
  @Input() countdown = 60;
  @Input() mobile: string | null;
  @Output() requestCode = new EventEmitter<string>();
  @Output() mobileInputEvent = new EventEmitter<string>();
  btnLabel$?: Observable<string>;
  form: FormGroup;
  @ViewChild('veriBtn', { read: ElementRef })
  veriBtn: ElementRef;
  private subs: Subscription[] = [];
  private propagateChange = (_: any) => { }
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      regMobile: [
        this.mobile,
        Validators.compose([Validators.required, Validators.pattern(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/)])
      ],
      smsCode: [
        '',
        Validators.compose([Validators.required, Validators.pattern(/^\d{6}$/)])
      ]
    });

  }
  
  ngOnInit() {
    if (!this.mobile) {
      const mobile = this.form.get('regMobile');
      this.subs.push(
        mobile!.valueChanges.pipe(
          filter(_ => mobile!.errors === null)
        ).subscribe(val => {
          // console.log(val)
          this.mobileInputEvent.emit(val)
        })
      )
    } else {
      this.form.setValue({regMobile: this.mobile, smsCode: ''})
      this.form.get('regMobile')?.disable()
    }

    const smsCode = this.form.get('smsCode')
    if (smsCode) {
      const code$ = smsCode.valueChanges;
      this.subs.push(code$.pipe(debounceTime(400)).subscribe((v: string) => this.propagateChange({
        mobile: this.mobile ? this.mobile : this.form.get('regMobile')?.value,
        code: v
      })))
    }
  }
  ngAfterViewInit() {
    const countDown$ = interval(1000).pipe( // 产生正增长的自然序列数
      map(i => this.countdown - i), // 60- 得到倒数的计数
      takeWhile(v => v >= 0), // 让其到0后自动完成
      startWith(this.countdown) // 因为是时间间隔 要给定初始值
    );
    this.btnLabel$ = fromEvent(this.veriBtn.nativeElement, 'click').pipe(
      tap(_ => this.requestCode.emit()), // 点击后立即发送给外部
      switchMap(_ => countDown$), // 此时将点击事件流转换成倒计时数字的数据流
      map(i => (i > 0 ? `还剩${i}秒` : '再次发送')),
      startWith('发送')
    );
  }
  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) sub.unsubscribe()
    })
    this.subs = []
  }
  validate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    if (!val) return null;
    const smsCode = this.form.get('smsCode');
    if (smsCode) {
      return smsCode.valid ? null : { smsCodeInvalid: true }
    }
    return { smsCodeInvalid: true }
  }
  writeValue(obj: any): void {
    this.mobile = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }
  get mobileErrors() {
    const mobile = this.form.get('regMobile');
    if (!mobile) return '';
    return mobileErrorMsg(mobile);
  }
}
