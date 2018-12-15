import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RewriterComponent} from './rewriter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RewriterComponent
  ],
  declarations: [
    RewriterComponent
  ]
})
export class RewriterModule { }
