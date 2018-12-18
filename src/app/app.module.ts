import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from '../core/routes';
import {DictionaryModule} from './dictionary/dictionary.module';
import {LoginModule} from './login/login.module';
import {SignupModule} from './signup/signup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ApiService} from '../common/services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {SignModule} from './sign/sign.module';
import {NavigationService} from '../common/services/navigation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    DictionaryModule,
    SignupModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    SignModule
  ],
  providers: [ApiService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
