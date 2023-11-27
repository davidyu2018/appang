import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../auth/services/auth.service";
import { filter } from "rxjs";
import { Event as NavigationEvent, NavigationStart } from "@angular/router";

@Component({
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  asideBar: any[] = [
    {
      icon: 'serve-f.svg',
      text: 'Products',
      path: './products',
      addicon: 'line-angle-down-icon.svg'
    },
    {
      icon: 'file-f.svg',
      text: 'Order list',
      path: './orders',
      addicon: ''
    }
  ]
  constructor(private auth: AuthService, private router: Router) {
    router.events.pipe(filter((event: NavigationEvent) => event instanceof NavigationStart)).subscribe((event: any) => {
      // console.log("navigation id:", event.restoredState)
    })
   }
  // logoutAdmin() {
  //   this.auth.clear();
  //   this.router.navigateByUrl('/landing/sports')
  // }
}