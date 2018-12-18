import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkDirective } from './router-link.directive';
import {NavigationService} from '../../services/navigation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RouterLinkDirective],
  exports: [RouterLinkDirective],
  providers: [NavigationService]
})
export class RouterlinkModule { }
