import { Component,Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Auth } from 'src/app/user/model';
import { SocialAuthService } from 'src/app/user/social-auth.service';
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
  constructor(private el: ElementRef, private socialAuth: SocialAuthService) { 
    this.socialAuth.getAuth().subscribe((auth: Auth) => {
      this.isLogin = !!auth.user
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
    this.posY = tardompos - 60
  }
  goLink(link: any) {
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
}
