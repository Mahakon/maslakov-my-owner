import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './signup.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ErrorDialogModule} from '../../common/components/errorDialog/errorDialog.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [SignupComponent],
  declarations: [SignupComponent]
})
export class SignupModule { }
