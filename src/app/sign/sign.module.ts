import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignComponent} from './sign.component';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterlinkModule} from '../../common/directives/routerlink/routerlink.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    RouterlinkModule
  ],
  exports: [SignComponent],
  declarations: [SignComponent]
})
export class SignModule { }
