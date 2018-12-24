import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './errorDialog.component.html',
  styleUrls: ['./errorDialog.component.less']
})
export class ErrorDialogComponent implements OnInit {
 constructor(
   public dialogRef: MatDialogRef<ErrorDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
