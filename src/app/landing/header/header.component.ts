import { Component,Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InternationalizationServiceTsService } from '../../core/internationalization.service';
import { LayoutService } from '../../core/layout.service';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  logo: any = {}
  loginfo$: Observable<any>;
  toolbars: any[] = [];
  loginDropdowns: any[] = []
  isLogin: boolean = false
  dropdowns: any[] = [];
  languages: any = {}
  posY: number = 0;
  cashDom: any = null;
  layoutOption: any
  // @Output() onEventMenu = new EventEmitter<object>()
  // @Output() onEventLink = new EventEmitter<object>()
  // @Output() onSwitchEvent = new EventEmitter<boolean>()
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => this.cashDom && this.setPosition(this.cashDom), 30)
    
  }
  constructor(private el: ElementRef, private socialAuth: AuthService, private http: HttpClient, private internation: InternationalizationServiceTsService, private layoutService: LayoutService) {
    this.http.get('./assets/configs/configs.json').subscribe((data: any) => {
      const resdata = {...data.data}
      this.logo = resdata.logo;
      this.toolbars = resdata.headerToolbar;
      this.loginDropdowns = resdata.loginDropdowns
      this.toolbars.some(t => t.button && t.button.langKey === 'langage') && (this.languages = this.internation.getInternation())
      this.toolbars.some(t => t.button && t.button.langKey === 'langage') && this.goLink(this.languages.currentLang)
    })
    this.loginfo$ = this.socialAuth.getAuth().pipe(map(auth => ({token: auth.token ? auth.token : '', name: auth.token ? auth.loginname : 'SECTION.NAV.LOGIN', avatar: auth.token ? auth.avatar : './assets/images/icons/user-account-login-icon.svg'})))
    this.loginfo$.subscribe(auth => this.isLogin = !!auth.token)
  }
  ngOnInit() {
    this.layoutService.getLayoutOption.subscribe(option => this.layoutOption = {...option})
  }
  userHandler($event: any) {
      if (this.isLogin) {
        this.dropdowns = this.loginDropdowns
        this.setPosition($event.target, 20)
      } else {
        this.socialAuth.unAuth()
      }
  }
  tapevent(li: any, $event: any) {
    this.generateDropdown(li, $event)
    this.setPosition($event.target)
  }
  generateDropdown(toolbar: any, $event: any) {
    if (toolbar.button.langKey) {
      this.dropdowns = this.languages.langs
      } else {
      const finIdx = this.toolbars.findIndex(t => t.button && (t.button.id === toolbar.button.id))
      this.dropdowns = [...this.toolbars[finIdx].dropdown]
      this.dropdowns = this.dropdowns.map(dd => (dd.switch ? {...dd, switchState: this.layoutOption[dd.id]} : dd))
    }

  }
  updateToolbar(toolbar: any) {
    if (toolbar.langKey) {
      const hasLan = this.toolbars.findIndex(it => it.button.langKey)
      const newbutton = {...this.toolbars[hasLan], button: toolbar}
      this.toolbars = [...this.toolbars.slice(0, hasLan), newbutton, ...this.toolbars.slice(hasLan+1)]
    } else {

    }
  }
  setPosition(elm: any, value: number = 0) {
    // const elm = $event.target
    this.cashDom = elm;
    const parelm = this.el.nativeElement.querySelector('.toobar-ul')
    const parElemWidth = parelm.offsetWidth
    const tardompos = this.getElementTop(parelm, elm)
    setTimeout(() => {
      const dropelem = this.el.nativeElement.querySelector('.dropdown-box')
      const droplemwidth = dropelem ? dropelem.offsetWidth : 0
      const calcValue = parElemWidth - tardompos - (droplemwidth / 2) - 10
      this.posY = value > 0 ? value : calcValue
    }, 10)
  }
  goLink(link: any) {
    if(link.langKey) {
      this.internation.setInternation(link.langKey)
      this.updateToolbar(link)
    } else if(link.id === "LOGOUT") {
      this.socialAuth.unAuth()
    }
    !link.switch && (this.dropdowns = [])
  }
  getElementTop(parent: any, sub: any): any {
    const parentClient = parent.getBoundingClientRect()
    const subClient = sub.getBoundingClientRect()
    return (subClient.left - parentClient.left)
  }
  onClickOutside($event: boolean) {
    $event && (this.dropdowns = [])
  }
  onSwitch(e: any, link: any) {
    const opti = {[link.id]: e}
    this.layoutService.setLayoutOption(opti)
  }
}
