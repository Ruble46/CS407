import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'DeleteProfileDialog',
    templateUrl: './deleteProfileDialog.component.html',
    styleUrls: ['./deleteProfileDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class DeleteProfileDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<DeleteProfileDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string) {}
  
    onClick(choice): void {
      this.dialogRef.close(choice);
    }
}