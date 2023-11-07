import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { ImagePicker} from './components/image-picker/image-picker.component'
import { VerifyMobileComponent } from './components/smsvalidate/verify-mobile.component'
import { SearchComponent } from './components/search/search.component'
import { ProcessStepComponent } from './components/process-step/process-step.component'
import { ClickOutsideDirective } from './directives/click-outside.directive'
const COMPONENTS: any[] = [ImagePicker, VerifyMobileComponent, SearchComponent, ProcessStepComponent]
const MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule,
  TranslateModule
]
const DIRECTIVE = [ClickOutsideDirective]
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVE],
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVE],
})
export class ShareModule { }
