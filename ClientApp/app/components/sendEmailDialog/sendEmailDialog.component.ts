import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Email } from '../../../Models/Email';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'sendEmailDialog',
    templateUrl: './sendEmailDialog.component.html',
    styleUrls: ['./sendEmailDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class SendEmailDialogComponent {
  
    constructor(public dialogRef: MatDialogRef<SendEmailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Email) {
        
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
}