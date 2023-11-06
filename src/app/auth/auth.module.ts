import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { QuoteComponent } from './components/quote/quote.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from './components/forgetpw/forgot-password-form'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    QuoteComponent,
    RegisterFormComponent,
    ForgotPasswordComponent,
    ForgotPasswordFormComponent
  ],
  imports: [
    ShareModule,
    AuthRoutingModule,
  ],
  providers: [
    // { provide: 'auth', useClass: AuthService },
  ]
})
export class AuthModule { }
