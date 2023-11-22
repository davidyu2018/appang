import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../auth/services/auth.service";

@Component({
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  asideBar: any[] = [
    {
      icon: 'serve-f.svg',
      text: 'Products',
      addicon: 'line-angle-down-icon.svg'
    },
    {
      icon: 'file-f.svg',
      text: 'Order list',
      addicon: ''
    }
  ]
  constructor(private auth: AuthService, private router: Router) { }
  // logoutAdmin() {
  //   this.auth.clear();
  //   this.router.navigateByUrl('/landing/sports')
  // }
}