import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import MAP_INTERNATION_NAME from '../../assets/configs/international'
@Injectable({
  providedIn: 'root'
})
export class InternationalizationServiceTsService {
  internationalization: Object = {}
  constructor(public translate: TranslateService,) {
    
  }

  getInternation() {
    const currNationlizon = JSON.parse(localStorage.getItem('LANGAGE_INFO') || 'null')
    currNationlizon && (this.internationalization = {...currNationlizon})
    return this.internationalization
  }
  setInternation(useLanKey: string = '') {
    const originLangs = [
      { name: MAP_INTERNATION_NAME['en'].name, icon: MAP_INTERNATION_NAME['en'].icon, langKey: 'en'},
      { name: MAP_INTERNATION_NAME['zh'].name, icon: MAP_INTERNATION_NAME['zh'].icon, langKey: 'zh'}
    ]
    originLangs.length && this.translate.addLangs(originLangs.map(lang => lang.langKey))
    if (originLangs.length === 0)  return 
    const browserLang = this.translate.getBrowserLang();
    const storeLangage = JSON.parse(localStorage.getItem('LANGAGE_INFO') || 'null')
    const storeUselan = storeLangage ? storeLangage.currentLang.langKey : ''
    const defusekey = storeUselan ? storeUselan : browserLang ?  browserLang : 'en'
    const currentLang = useLanKey ? useLanKey : defusekey
    this.translate.use(currentLang)
    const currUseLan = originLangs.find((lan:any) => lan.langKey === currentLang)
    this.internationalization = {...this.internationalization, currentLang: currUseLan, langs: originLangs}
    localStorage.setItem('LANGAGE_INFO', JSON.stringify(this.internationalization))
  }
}
