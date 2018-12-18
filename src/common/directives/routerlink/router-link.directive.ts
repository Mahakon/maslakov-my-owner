import {Directive, HostListener, Input} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';

@Directive({
  selector: '[appRouterLink]'
})
export class RouterLinkDirective {
  @Input() routerLink: string;

  constructor(
    private navigationService: NavigationService
  ) {}

  @HostListener('mouseup') click() {
    this.navigationService.goTo(this.routerLink);
  }

}
