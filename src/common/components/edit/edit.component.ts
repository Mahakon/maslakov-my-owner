import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  form: FormGroup;
 constructor(
   private formBuilder: FormBuilder,
   public apiService: ApiService,
   public dialogRef: MatDialogRef<EditComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      word: [this.data.word],
      translation: [this.data.translation]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getErrorMessage(control: AbstractControl) {
    return control.hasError('required') ?
      'You must enter a value' : 'Not a valid field';
  }

  submit() {
   if (this.form.invalid) {
     return;
   }

   this.apiService.editWordInfo(this.data.wordId, this.form.get('translation').value)
     .subscribe(() => {
       this.onNoClick();
     });
  }
}
