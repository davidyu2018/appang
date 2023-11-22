import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularResizeEventModule } from 'angular-resize-event';

import { TranslateModule} from '@ngx-translate/core';
import { ImagePicker} from './components/image-picker/image-picker.component'
import { VerifyMobileComponent } from './components/smsvalidate/verify-mobile.component'
import { SearchComponent } from './components/search/search.component'
import { ProcessStepComponent } from './components/process-step/process-step.component'
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AngTableComponent } from './components/ang-table/ang-table.component';
import { SwitchComponent } from './components/switch/switch.component';
import { BackButtonDirective} from './directives/back-button.directive'
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { InputRefDirective} from './directives/input-ref.directive'
import { AuFaInputComponent } from './components/awesoment-input/awesoment-input.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component'
import { AgGridModule } from 'ag-grid-angular';
import {CalcHeightDirective } from './directives/calculate-height.directive'
import {AddClassDirective} from './directives/addclass-attr.directive'
const COMPONENTS: any[] = [
  ImagePicker, VerifyMobileComponent, SearchComponent,
   ProcessStepComponent, 
  AngTableComponent,SwitchComponent, AuFaInputComponent,
  LayoutComponent,
  MenuComponent, MenuItemComponent
]
const DIRECTIVE = [
  InputRefDirective, ClickOutsideDirective, BackButtonDirective,
   PasswordPatternDirective,AddClassDirective,
   MatchPasswordDirective, ValidateUserNameDirective, CalcHeightDirective]
const MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule,
  TranslateModule,
  AgGridModule,
  AngularResizeEventModule
]
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVE],
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVE],
})
export class ShareModule { }
