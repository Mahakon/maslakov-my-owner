import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../common/services/api.service';
import {NavigationService} from '../../common/services/navigation.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.less']
})
export class DictionaryComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
  }

  changeRoute(route: string) {
    this.navigationService.goTo(route);
  }

}
