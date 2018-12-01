import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'promoteDemoteDialog',
    templateUrl: './promoteDemoteDialog.component.html',
    styleUrls: ['./promoteDemoteDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class PromoteDemoteDialogComponent {

    public content: string;
    constructor (
      public dialogRef: MatDialogRef<PromoteDemoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
        this.content = data;
      }
  
    onClick(choice): void {
      this.dialogRef.close(choice);
    }
}