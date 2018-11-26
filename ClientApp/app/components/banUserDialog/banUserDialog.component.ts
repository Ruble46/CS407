import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'BanUserDialogComponent',
    templateUrl: './banUserDialog.component.html',
    styleUrls: ['./banUserDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class BanUserDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<BanUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: string) {}
  
    onClick(choice): void {
      this.dialogRef.close(choice);
    }
}