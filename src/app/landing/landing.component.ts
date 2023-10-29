import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent {
  logo: any = {}
  headerToolbar: any[]  = [];
  headerDropdowns: any[] = [];
  constructor(public translate: TranslateService, private http: HttpClient) {
    // 1: init header configs info && nationlizion
    this.http.get('./assets/configs/configs.json').subscribe((data: any) => {
      this.headerToolbar = data.data.headerToolbar
      this.logo = data.data.logo
      // find out how many lang were configed
      const lang = this.headerToolbar.find(i => i.button.name === 'LANG')
      const droplang =  lang && lang.dropdown && lang.dropdown.length ? lang.dropdown : []
      const langkey = droplang.map((lan:any) => lan.langKey)
      const browserLang = translate.getBrowserLang();
      const cussetlan = localStorage.getItem('SET_LANGAGE')
      translate.addLangs(langkey)
      translate.use(cussetlan ? cussetlan : browserLang?.match(/en|zh/) ? browserLang : 'en');
      // initial current lang
      const initlink = droplang.find((dr: any) => dr.langKey === translate.currentLang)
      this.onEventLink(initlink)
      
    })
    // 2: auth update
  }
  onEventMenu(li: any) {
    const dropdowns = li.dropdown
    this.headerDropdowns = [...dropdowns]
    this.headerDropdowns = this.headerDropdowns.map (it => {
      if (it.langKey && it.langKey === this.translate.currentLang) {
        it = {...it, active: true}
      } else {
        it = {...it, active: false}
      }
      return it
    })
  }
  onEventLink(link: any) {
    if ('langKey' in link) {
      const iLang = this.headerToolbar.findIndex(i => !!i.button.langKey)
      const updateItem = Object.assign({}, this.headerToolbar[iLang], {button: link});
      this.headerToolbar = [...this.headerToolbar.slice(0, iLang), updateItem, ...this.headerToolbar.slice(iLang + 1)];
      this.translate.use(link.langKey)
      localStorage.setItem('SET_LANGAGE', link.langKey)
    } else {
    // console.log('lnks', link)
    }
  }
}
