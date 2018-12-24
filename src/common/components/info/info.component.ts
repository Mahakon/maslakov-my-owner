import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less']
})
export class InfoComponent implements OnInit {
  form: FormGroup;
 constructor(
   private formBuilder: FormBuilder,
   public dialogRef: MatDialogRef<InfoComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      englishWord: [this.data.englishWord],
      translation: [this.data.translation],
      totalNumOfTrains: [this.data.totalNumOfTrains],
      numOfSuccessTrains: [this.data.numOfSuccessTrains],
      percentOfKnowledge: [this.data.percentOfKnowledge]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
