import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Auth } from '../auth/services/model';
import { filter, map, mergeMap, take, startWith, delay, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InternationalizationServiceTsService } from '../core/internationalization.service';
import { SignInService } from '../auth/services/sign-in.service';
import { LayoutService } from '../core/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent {
  logo: any = {}
  headerToolbar: any[]  = [];
  headerDropdowns: any[] = [];
  loginfo: any ={token: '', redirectUrl:''};
  navs$: Observable<any[]>;
  fixWidth$: Observable<boolean>
  internationState: any | null = {}
  layoutOption: any = {}
  constructor( private http: HttpClient, private auth: AuthService, private router: Router, 
    private signService: SignInService, private internation: InternationalizationServiceTsService,
    private layoutService: LayoutService) {
    // --------------------------------------------  1: First init default congif header toolbar ------------------------------------------

    this.http.get('./assets/configs/configs.json').subscribe((data: any) => {
      // 1: init header configs info && nationlizion
      this.headerToolbar = data.data.headerToolbar
      this.logo = data.data.logo
      // 2: init nationlizion toolbar
      this.internationState = this.internation.getInternation()
      const index = this.headerToolbar.findIndex(it => it.button.langKey)
      const dropdown = this.internationState.langs
      const currentLang = this.internationState.currentLang
      let langItem = this.headerToolbar[index]
      if (index > -1 && dropdown && dropdown.length) {
        const updatelangItem = {...langItem, dropdown}
        this.headerToolbar = [...this.headerToolbar.slice(0, index), updatelangItem, ...this.headerToolbar.slice(index+1)]
        currentLang && this.onEventLink(currentLang)
      }
      // --------------------------------------------  2: acconding to checked auth update toolbar ------------------------------------------
      this.auth.getAuth().subscribe(loginfo => {
        this.loginfo = {...loginfo} 
        if (this.loginfo.token && this.headerToolbar.length) {
          const tI = this.headerToolbar.findIndex(it => it.button && it.button.id === 'LOGIN')
          const loginTool = this.headerToolbar[tI]
          const newLoginTool = {...loginTool.button, name: this.loginfo.loginname, icon: this.loginfo.avatar}
          const updateLoginTool = {...loginTool, button: newLoginTool}
          this.headerToolbar = [...this.headerToolbar.slice(0, tI), updateLoginTool, ...this.headerToolbar.slice(tI+1)]
        } 
        // this.router.navigate([this.loginfo.redirectUrl])
      })
    })
    
    
  }
  
  ngOnInit() {
    this.navs$ = this.signService.getMenus().pipe(share()) // if this is nesscery auth , put in if stantence above
    // 3: init layout option
    this.layoutService.getLayoutOption.subscribe(option => this.layoutOption = {...option})
    this.fixWidth$ = this.layoutService.getLayoutOption.pipe(map(x => x['FIXED_WIDTH']))
    // 4: init router

  }
  onEventMenu(li: any) {
    if (li.button.name === 'LOGIN' && !this.loginfo.token) {
      this.auth.unAuth()
      return
    };
    if (li.button.id === 'SEARCH') {
      // go to search page
      return
    };
    const dropdowns = li.dropdown || []
    this.headerDropdowns = [...dropdowns]
    this.headerDropdowns = this.headerDropdowns.map (it => {
      if (it.switch) {
        it = {...it, switchState: this.layoutOption[it.id]}
      }
      return it
    })

  }
  onEventLink(link: any) {
    if ('langKey' in link) {
      this.internation.setInternation(link.langKey)
      const iLang = this.headerToolbar.findIndex(to => !!to.button.langKey)
      const nLink = {...link, name: ''}
      const updateItem = {...this.headerToolbar[iLang], button: nLink};
      this.headerToolbar = [...this.headerToolbar.slice(0, iLang), updateItem, ...this.headerToolbar.slice(iLang + 1)];
    } else if (link.name === 'LOGOUT') {
        this.auth.unAuth()
    } else if (link.switch) {
      // console.log('stting:',link)
    }
  }
  onSwitchEvent(e: any) {
    const opti = {[e.id]: e.switchState}
    this.layoutService.setLayoutOption(opti)
  }
}
