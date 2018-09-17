import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../../../Models/Post';
import { NewPostDialogComponent } from '../newPostDialog/newPostDialog.component';

@Component({
    selector: 'navigationBar',
    templateUrl: './navigationBar.component.html',
    styleUrls: ['./navigationBar.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class NavigationBarComponent {
    public dialog1: MatDialog;
    public newPost: Post;
    public post: Post;

    constructor(public dialog: MatDialog) {
        this.dialog1 = dialog;
        this.newPost = new Post();
    }

    openNewPost() {
        const dialogRef = this.dialog.open(NewPostDialogComponent, {
            width: '400px',
            data: {post: this.newPost}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result === undefined) { //cancel was clicked
                console.log("Create post was cancelled.");
            } else { //create was clicked
                this.post = result;
                console.log(this.post);
            }
            this.newPost = new Post();
          });
    }
}


