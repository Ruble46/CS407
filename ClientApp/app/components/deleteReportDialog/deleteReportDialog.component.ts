import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'DeleteReportDialogComponent',
    templateUrl: './deleteReportDialog.component.html',
    styleUrls: ['./deleteReportDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class DeleteReportDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<DeleteReportDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string) {}
  
    onClick(choice): void {
      this.dialogRef.close(choice);
    }
}