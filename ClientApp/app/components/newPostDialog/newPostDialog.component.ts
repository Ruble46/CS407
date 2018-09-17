import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../../../Models/Post';

@Component({
    selector: 'NewPostDialog',
    templateUrl: './newPostDialog.component.html',
    styleUrls: ['./newPostDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class NewPostDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<NewPostDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Post) {}
  
    onCancel(): void {
      this.dialogRef.close();
    }
}