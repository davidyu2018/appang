import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { ImagePicker} from './components/image-picker/image-picker.component'
import { VerifyMobileComponent } from './components/smsvalidate/verify-mobile.component'
import { SearchComponent } from './components/search/search.component'
import { ProcessStepComponent } from './components/process-step/process-step.component'
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AngTableComponent } from './components/ang-table/ang-table.component';
import { SwitchComponent } from './components/switch/switch.component';
import { BackButtonDirective} from './directives/back-button.directive'
import { PreventMultiSubmitDirective} from './directives/prevent-multi-submit.directive';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { InputRefDirective} from './directives/input-ref.directive'
import { AuFaInputComponent } from './components/awesoment-input/awesoment-input.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { NavItemComponent } from './components/nav/nav-item/nav-item.component'
import { AgGridModule } from 'ag-grid-angular';

const COMPONENTS: any[] = [
  ImagePicker, VerifyMobileComponent, SearchComponent,
   ProcessStepComponent, 
  AngTableComponent,SwitchComponent, AuFaInputComponent,
  LayoutComponent, NavComponent, NavItemComponent
]
const DIRECTIVE = [
  InputRefDirective, ClickOutsideDirective, BackButtonDirective,
  PreventMultiSubmitDirective, PasswordPatternDirective,
   MatchPasswordDirective, ValidateUserNameDirective]
const MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule,
  TranslateModule,
  AgGridModule
]
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVE],
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVE],
})
export class ShareModule { }
