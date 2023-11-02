import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ImagePicker} from './components/image-picker/image-picker.component'
const COMPONENTS: any[] = [ImagePicker]
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
