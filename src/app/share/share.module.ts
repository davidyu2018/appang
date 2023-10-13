import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS: any[] = []
const MODULES = [
  CommonModule, 
  FormsModule, 
  ReactiveFormsModule
]

@NgModule({
  declarations: DECLARATIONS,
  imports: MODULES
})
export class ShareModule { }
