import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

const DECLARATIONS: any[] = []
const EXPORT_COPMONENTS: any[] = []
const MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule,
  TranslateModule
]

@NgModule({
  declarations: DECLARATIONS,
  imports: MODULES,
  exports: [...MODULES, ...EXPORT_COPMONENTS],
})
export class ShareModule { }
