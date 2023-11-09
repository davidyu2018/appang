import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../auth/services/auth.service";

@Component({
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private auth: AuthService, private router: Router) { }
  // logoutAdmin() {
  //   this.auth.clear();
  //   this.router.navigateByUrl('/landing/sports')
  // }
}