import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {controlTreeTraversal} from '../../common/extra/extra';
import {ApiService} from '../../common/services/api.service';
import {IUser} from '../../common/common.entities';
import {Subject} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../../common/components/errorDialog/errorDialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nickName: ['maha', [Validators.required]],
      email: ['mkon.masha@gmail.com', [Validators.required, Validators.email]],
      password: ['3', [Validators.required]],
      firstName: ['3', [Validators.required]],
      secondName: ['3', [Validators.required]]
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

    this.apiService.signUp(this.userInfo)
      .pipe(
        catchError(() => {
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
        this.apiService.currentUserName = data.nickName;
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
