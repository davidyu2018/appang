import { Component, Inject, OnInit } from "@angular/core";
import { Observable, Subscription, BehaviorSubject, Subject, of } from "rxjs";
import { take, switchMap, catchError, startWith, tap, withLatestFrom, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, Quote, Captcha } from "../../services/model";
import { AuthService } from "../../services/auth.service";
import { SignInService } from "../../services/sign-in.service";
@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  slides: any[] = [];
  photo: string = './assets/images/lbg1.jpg';
  subscription: Subscription = new Subscription()
  quote$: Observable<Quote>;

  captcha$?: Observable<Captcha>;
  clickSub = new Subject(); // clickSub --> captchaSub 点击验证码图像的事件流  会引发下面API流captchaSub
  captchaSub = new BehaviorSubject<Captcha | null>(null) // API流： this.auth.requestCaptcha()

  inputSub = new Subject<string>(); // inputSub --> sub 输入验证码流会引发 校验验证码API流
  sub = new Subscription() // API流： this.auth.verifyCaptcha(token, code)
  constructor(private auth: AuthService, private signinService: SignInService, private router: Router, private route: ActivatedRoute) {
    this.signinService.getImageUrl().subscribe((images: any[]) => {
      this.slides = [...images];
      this.rotateImages(this.slides)
    })
    this.quote$ = this.signinService.getQuotes().pipe( // 通过管道async隐式订阅
      map((quotes: Quote[]) => quotes[Math.floor(Math.random() * 10)])
    )

  }
  ngOnInit(): void {
    // this.captcha$! = this.clickSub.pipe(
    //   startWith({}),//组件初始化时还没有点击图形吗，但要先显示一个图
    //   switchMap(_ => this.auth.requestCaptcha()), // 若外层流（点击图片流）有值发出，就立刻取消之前德订阅，重新订阅新值
    //   tap(captcha => this.captchaSub.next(captcha))
    // )
    // this.sub = this.inputSub.pipe(
    //   withLatestFrom(this.captchaSub),
    //   switchMap(([code, captcha]) => this.auth.verifyCaptcha(captcha!.captcha_token, code).pipe(
    //     map(res => res.validate_token),
    //     catchError(err => of(err.error.title))
    //   )
    //   )
    // ).subscribe((t: any) => console.log('verifyed code:', t))
  }
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe()
  }
  refreshCaptcha() {
    this.clickSub.next(null);
  }
  verifyCaptcha(code: string) {
    this.inputSub.next(code)
  }
  processLogin(loginform: any) {
    this.auth.loginWithCredentials(loginform).pipe(
      take(1) // 为了收到一个数据后就完成这个流的订阅，同时也销毁动作。
    ).subscribe((auth: Auth) => {
      if (auth.user) {
        this.router.navigate([auth.redirectUrl || '/'])
      } else {
        console.log('login-success:', '找不到本用户')
      }
    })
  }

  rotateImages(arr: string[]) {
    const length = arr.length
    let i = 0;
    setInterval(() => {
      i = (i + 1) % length;
      this.photo = this.slides[i].contentUrl;
    }, 4000)
  }
}