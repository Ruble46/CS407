import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'AssignSelfDialogComponent',
    templateUrl: './assignSelfDialog.component.html',
    styleUrls: ['./assignSelfDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class AssignSelfDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<AssignSelfDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string) {}
  
    onClick(choice): void {
      this.dialogRef.close(choice);
    }
}