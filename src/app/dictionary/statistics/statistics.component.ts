import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ApiService} from '../../../common/services/api.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  dictionaryWords = [];
  private onDestroy$ = new Subject<void>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.userDictionary()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((dictionaryWords) => {
        this.dictionaryWords = dictionaryWords;
      });
  }

  ngOnDestroy() {
  }

}
