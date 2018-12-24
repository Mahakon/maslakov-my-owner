import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ApiService} from '../../../common/services/api.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {IDictionaryWord} from '../../../common/common.entities';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../../../common/components/errorDialog/errorDialog.component';
import {InfoComponent} from '../../../common/components/info/info.component';
import {EditComponent} from '../../../common/components/edit/edit.component';
import {AddComponent} from '../../../common/components/add/add.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  dictionaryWords: IDictionaryWord[] = [];
  counter = '';
  COLORS = {
    'STUDIED': 'green',
    'NOT_STUDIED': 'red',
    'ON_THE_WAY': 'yellow'
  };
  private onDestroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.apiService.userDictionary()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((dictionaryWords) => {
        this.dictionaryWords = dictionaryWords;
      });

    this.apiService.getCounter()
      .subscribe((data) => {
        this.counter = data.totalNumOfWords;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  deleteWordFromDictionary(dictionaryWord: IDictionaryWord) {
    this.dictionaryWords = this.dictionaryWords.filter((word) => word !== dictionaryWord);

    this.apiService.deleteWordFromDictionary(dictionaryWord.wordId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  showInfo(dictionaryWord: IDictionaryWord) {
    this.apiService.getWordInfo(dictionaryWord.wordId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        const dialogRef = this.dialog.open(InfoComponent, {
          width: '400px',
          data: {...data}
        });

        dialogRef.afterClosed().subscribe(() => {});
      });
  }

  editInfo(dictionaryWord: IDictionaryWord) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: {...dictionaryWord}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.apiService.userDictionary()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((dictionaryWords) => {
          this.dictionaryWords = dictionaryWords;
        });
    });
  }

  addWord() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.apiService.userDictionary()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((dictionaryWords) => {
          this.dictionaryWords = dictionaryWords;
        });
    });
  }
}
