import { Component,Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Auth } from '../../auth/services/model';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isLogin: boolean = false;
  toggle: boolean = false
  toolbars: any[] = [];
  dropdowns: any[] = [];
  posY: number = 0;
  @Input() logo: any ={};
  @Input() hasHeaderSearch: boolean = false
  @Input() 
  set headerToolbar(toolbars: any[]) {
    this.toolbars = [...toolbars]
  }
  @Input() 
  set headerDropdowns(dropdowns: any[]) {
    this.dropdowns = [...dropdowns]
    this.dropdowns.length && (this.toggle = true)
    this.dropdowns.length === 0 && (this.toggle = false)
  }

  @Output() onEventMenu = new EventEmitter<object>()
  @Output() onEventLink = new EventEmitter<object>()
  @Output() onSwitchEvent = new EventEmitter<boolean>()

  constructor(private el: ElementRef, private socialAuth: AuthService) { 
    this.socialAuth.getAuth().subscribe((auth: Auth) => {
      this.isLogin = !!auth.token
    })
  }
  ngOnInit() {
  }
  tapevent(li: any, $event: any) {
    const elm = $event.target
    const parelm = this.el.nativeElement.querySelector('.header-icons')
    this.onEventMenu.emit(li)
    // capture cursor axious
    const tardompos = this.getElementTop(parelm, elm)
    this.posY = tardompos + 13

    li.dropdown && li.dropdown.length && setTimeout(() => {
      const dropdom = this.el.nativeElement.querySelector('.dropdown-box')
      this.posY = this.posY - dropdom.offsetWidth / 2
    }, 20)
  }
  goLink(link: any) {
    if (link.switch) {
      setTimeout(() => {
      this.onEventLink.emit(link)
      this.toggle = false
    }, 1000)
      return;
    }
    this.toggle = false
    this.onEventLink.emit(link)
  }
  getElementTop(parent: any, sub: any): any {
    const parentClient = parent.getBoundingClientRect()
    // console.log('poss1', parentClient )

    const subClient = sub.getBoundingClientRect()
    // console.log('poss2', subClient )

    return (subClient.left - parentClient.left)
  }
  onClickOutside($event: boolean) {
    $event && (this.dropdowns = [])
  }
  onSwitch(e: any, link: any) {
    const newlink = {...link, switchState: e}
    localStorage.setItem(link.id, JSON.stringify(e))
    this.onSwitchEvent.emit(newlink)
  }
}
