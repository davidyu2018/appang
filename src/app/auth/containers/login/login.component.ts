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
  photo: string = './assets/images/bg/lbg1.jpg';
  subscription: Subscription = new Subscription()
  quote$: Observable<Quote>;

  captcha$: Observable<Captcha | null>;
  clickSub$ = new Subject(); // clickSub --> captchaSub 点击验证码图像的事件流  会引发下面API流captchaSub
  captchaSub$ = new BehaviorSubject<Captcha | null>(null) // API流： this.auth.requestCaptcha()

  verifySub$ = new Subject<string>(); // inputSub --> sub 输入验证码流会引发 校验验证码API流
  sub$ = new Subscription() // API流： this.auth.verifyCaptcha(token, code)
  constructor(private auth: AuthService, private signinService: SignInService, private router: Router, private route: ActivatedRoute) {
    this.signinService.getImageUrl().subscribe((images: any[]) => {
      this.slides = [...images];
      this.rotateImages(this.slides)
    })
    this.quote$ = this.signinService.getQuotes().pipe( // 通过管道async隐式订阅
      map((quotes: Quote[]) => quotes[Math.floor(Math.random() * 10)])
    )
    this.captcha$ = this.clickSub$.pipe(
      startWith({}), // 得初始化一个图形码
      switchMap(_ => this.auth.requestCaptcha()), // mergeAll & mergeMap & switchMap 都是把内层流和外层流映射，但switchMap 是只对外层流最新的值映射，而mergeMap每次都会和内层映射
      tap(captcha => { this.captchaSub$.next(captcha)})
    )
    this.sub$ = this.verifySub$.pipe(
      withLatestFrom(this.captchaSub$),
      switchMap(
        ([code, captcha]) => this.auth.verifyCaptcha(captcha!.captcha_token, code).pipe( map(res => res.validate_token), catchError(err => of(err.error.title))) 
      )
    ).subscribe(t => console.log(t))
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe()
  }
  refreshCaptcha() {
    this.clickSub$.next(null); // subject 流 这个时候就有值了，但如果是普通obserable fromEvent 流 就要先订阅才产生值
  }
  verifyCaptcha(code: string) {
    this.verifySub$.next(code)
  }
  processLogin(loginform: any) {
    this.auth.loginWithCredentials(loginform).pipe(
      take(1) // 为了收到一个数据后就完成这个流的订阅，同时也销毁动作。
    ).subscribe((auth: Auth) => {
      if (auth.token) {
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