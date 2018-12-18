import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../common/services/navigation.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.less']
})
export class SignComponent implements OnInit {
  routes = ['sign/in', 'sign/up'];
  currentIndex = 0;

  get isActive(): boolean {
    return this.currentIndex === 0;
  }

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  changeRoute({index}) {
    this.navigationService.goTo(this.routes[+index]);
    this.currentIndex = +index;
  }

}
