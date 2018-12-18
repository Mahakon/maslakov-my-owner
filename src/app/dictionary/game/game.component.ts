import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ApiService} from '../../../common/services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

}
