import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {controlTreeTraversal} from '../../../common/extra/extra';
import {ApiService} from '../../../common/services/api.service';
import {ITranslation, IWord} from '../../../common/common.entities';
import {catchError, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../../../common/components/errorDialog/errorDialog.component';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.less']
})
export class TranslatorComponent implements OnInit, OnDestroy {
  textControl: AbstractControl;
  form: FormGroup;
  translations = [];
  translatedText = '';

  private onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      word: ['', [Validators.required]],
      from: ['en'],
      to: ['ru']
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  submit() {
    controlTreeTraversal(this.form, control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.form.invalid) {
      return;
    }

    this.apiService.translateWord(this.word)
      .pipe(
        catchError(({error}) => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            data: {error: error.errorMessage}
          });

          dialogRef.afterClosed().subscribe(() => {});

          return [];
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe((e) => {
        this.translatedText = e.text;
        this.translations = e.translations;
      });
  }

  registerChosenWord(translation: ITranslation) {
    this.translations = this.translations.filter((trans) => {
      return trans !== translation;
    });

    this.apiService.registerWord({
      text: this.translatedText,
      translation
    }).pipe(
      catchError(({error}) => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          data: {error: error.errorMessage}
        });

        dialogRef.afterClosed().subscribe(() => {});

        return [];
      }),
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  private get word(): IWord {
    return {
      word: this.form.get('word').value,
      from: this.form.get('from').value,
      to: this.form.get('to').value
    };
  }

}
