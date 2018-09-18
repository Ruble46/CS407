import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../../../Models/Post';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'NewPostDialog',
    templateUrl: './newPostDialog.component.html',
    styleUrls: ['./newPostDialog.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class NewPostDialogComponent {
    public platformList: string[] = ['Steam', 'Xbox', 'Playstation', 'Wii'];
    public gameList: string[] = ['Rocket League', 'Garrys Mod', 'GTA V', 'Call of Duty: MW2', 'Subnautica', 'Age of Mythology', 'Half Life 2'];
    public platform: string;
    public game;
  
    constructor(
      public dialogRef: MatDialogRef<NewPostDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Post) {}
  
    onCancel(): void {
      this.dialogRef.close();
    }
}