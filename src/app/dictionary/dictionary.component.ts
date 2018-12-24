import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../common/services/api.service';
import {NavigationService} from '../../common/services/navigation.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {ErrorDialogComponent} from '../../common/components/errorDialog/errorDialog.component';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.less']
})
export class DictionaryComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(
    public apiService: ApiService,
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  changeRoute(route: string) {
    this.navigationService.goTo(route);
  }

  deleteAccount() {
    this.apiService.deleteUser().subscribe();
    this.changeRoute('sign/in');
  }

  ngOnDestroy() {
  }

}
