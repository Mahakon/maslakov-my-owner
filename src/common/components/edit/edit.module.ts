import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit.component';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {ApiService} from '../../services/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [ApiService],
  exports: [EditComponent],
  declarations: [EditComponent],
  entryComponents: [EditComponent]
})
export class EditModule { }
