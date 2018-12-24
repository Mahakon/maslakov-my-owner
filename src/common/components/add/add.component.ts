import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  form: FormGroup;
 constructor(
   private formBuilder: FormBuilder,
   public apiService: ApiService,
   public dialogRef: MatDialogRef<AddComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      word: [''],
      translation: ['']
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

   this.apiService.registerWord({text: this.form.get('word').value, translation: {translation: this.form.get('translation').value, partOfSpeech: 'существительное'}})
     .subscribe(() => {
       this.onNoClick();
     });
  }
}
