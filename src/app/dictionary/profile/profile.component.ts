import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ApiService} from '../../../common/services/api.service';
import {controlTreeTraversal} from '../../../common/extra/extra';
import {ErrorDialogComponent} from '../../../common/components/errorDialog/errorDialog.component';
import {IUser} from '../../../common/common.entities';
import {NavigationService} from '../../../common/services/navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nickName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]],
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]]
    });

    this.apiService.getUserInfo()
      .subscribe((user) => {
        this.form.patchValue(user);
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

    this.apiService.changeUserInfo(this.userInfo)
      .pipe(
        catchError((error) => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            data: {error: 'Such user is already exist'}
          });

          dialogRef.afterClosed().subscribe(() => {});

          return [];
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe((data) => {
        this.navigationService.goTo('sign/in');
        this.apiService.currentUserName = this.userInfo.nickName;
      });
  }

  private get userInfo(): IUser {
    return {
      nickName: this.form.get('nickName').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      firstName: this.form.get('firstName').value,
      secondName: this.form.get('secondName').value
    };
  }
}
