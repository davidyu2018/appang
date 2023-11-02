import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from './social-auth.service';
import { UserProfileService } from './user-profile.service';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'socialAuth', useClass: SocialAuthService },
    { provide: 'user', useClass: UserProfileService },
    AuthGuardService
  ]
})
export class UserModule { }
