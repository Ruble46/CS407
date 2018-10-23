import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ReportUser } from '../../../Models/ReportUser';

@Component({
    selector: 'reportUserDialog',
    templateUrl: './reportUserDialog.component.html',
    styleUrls: ['./reportUserDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class ReportUserComponent {

  constructor(public dialogRef: MatDialogRef<ReportUserComponent>, @Inject(MAT_DIALOG_DATA) public data: ReportUser) {
    console.log(data);
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}