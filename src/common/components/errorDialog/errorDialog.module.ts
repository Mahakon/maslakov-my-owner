import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorDialogComponent} from './errorDialog.component';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule
  ],
  exports: [ErrorDialogComponent],
  declarations: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }
