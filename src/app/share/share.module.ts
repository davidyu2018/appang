import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule} from '@ngx-translate/core';
import { ImagePicker} from './components/image-picker/image-picker.component'
import { VerifyMobileComponent } from './components/smsvalidate/verify-mobile.component'
import { SearchComponent } from './components/search/search.component'
import { ProcessStepComponent } from './components/process-step/process-step.component'
const COMPONENTS: any[] = [ImagePicker, VerifyMobileComponent, SearchComponent, ProcessStepComponent]
const MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule,
  TranslateModule
]

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS],
})
export class ShareModule { }
