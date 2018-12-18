import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DictionaryComponent} from './dictionary.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import { TranslatorComponent } from './translator/translator.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GameComponent } from './game/game.component';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    DictionaryComponent,
    TranslatorComponent,
    StatisticsComponent,
    GameComponent
  ],
  declarations: [
    DictionaryComponent,
    TranslatorComponent,
    StatisticsComponent,
    GameComponent
  ]
})
export class DictionaryModule { }
