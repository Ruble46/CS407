import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../../../Models/Post';
import { NewPostDialogComponent } from '../newPostDialog/newPostDialog.component';
import { SnackBarHelper } from '../../../Helpers/SnackBars';

@Component({
    selector: 'navigationBar',
    templateUrl: './navigationBar.component.html',
    styleUrls: ['./navigationBar.component.css', '../../../themes/theme.css'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent {
    public dialog1: MatDialog;
    public newPost: Post;
    public post: Post;
    public snackBarHelper: SnackBarHelper;

    constructor(public _snackBarHelper: SnackBarHelper, public dialog: MatDialog) {
        this.snackBarHelper = _snackBarHelper;
        this.dialog1 = dialog;
        this.newPost = new Post();
    }

    openNewPost() {
        const dialogRef = this.dialog.open(NewPostDialogComponent, {
            width: '400px',
            data: { post: this.newPost }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === undefined) { //cancel was clicked
                console.log("Create post was cancelled.");
            } else { //create was clicked
                this.post = result;
                console.log(this.post);
            }
            this.newPost = new Post();
        });
    }

    logSearch() {
        let search = (<HTMLInputElement>document.getElementById("searchInput")).value;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(search)) {
            console.log(`User's search: ${search}`);
        }
        else {
            this.snackBarHelper.openSnackBar('Please provide a valid email when attempting to search for users', 'Close', 3000);
        }
    }
}


