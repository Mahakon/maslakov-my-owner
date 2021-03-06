import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser, IUserLoginInfo} from '../../common/common.entities';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {controlTreeTraversal} from '../../common/extra/extra';
import {catchError, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApiService} from '../../common/services/api.service';
import {NavigationService} from '../../common/services/navigation.service';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../../common/components/errorDialog/errorDialog.component';

@Component({
  selector: 'app-rewriter',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['masha', [Validators.required]],
      password: ['123', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  getErrorMessage(control: AbstractControl) {
    return control.hasError('required') ?
      'You must enter a value' : 'Not a valid field';
  }

  submit() {
    controlTreeTraversal(this.form, control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.form.invalid) {
      return;
    }

    this.apiService.signIn(this.userInfo)
      .pipe(
        catchError(() => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            data: {error: 'Wrong login/password'}
          });

          dialogRef.afterClosed().subscribe(() => {});

          return [];
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe((data) => {
        this.apiService.currentUserName = this.userInfo.username;

        this.navigationService.goTo('dictionary/translator');
      });
  }

  private get userInfo(): IUserLoginInfo {
    return {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
  }

}
