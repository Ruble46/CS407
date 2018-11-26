import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'AddNewPlatformDialogComponent',
    templateUrl: './addNewPlatformDialog.component.html',
    styleUrls: ['./addNewPlatformDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class AddNewPlatformDialogComponent {

  steamID: string = "";

  constructor(public dialogRef: MatDialogRef<AddNewPlatformDialogComponent>/*, @Inject(MAT_DIALOG_DATA) public data: string*/) {

  }

  onClick(choice): void {
    if(choice === "Cancel") {
      this.dialogRef.close();
    } else {
      this.dialogRef.close(this.steamID);
    }
  }
}