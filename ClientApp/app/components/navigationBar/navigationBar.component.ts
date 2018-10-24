import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../../../Models/Post';
import { NewPostDialogComponent } from '../newPostDialog/newPostDialog.component';
import { SnackBarHelper } from '../../../Helpers/SnackBars';
import { PostService } from '../../../Services/PostService';

@Component({
    selector: 'navigationBar',
    templateUrl: './navigationBar.component.html',
    styleUrls: ['./navigationBar.component.css', '../../../themes/theme.css'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements OnInit{
    private postService: PostService;
    public dialog1: MatDialog;
    public newPost: Post;
    public post: Post;
    public snackBarHelper: SnackBarHelper;
    public value: string;
    public thisUser: string;

    constructor(private _postService: PostService, public _snackBarHelper: SnackBarHelper, public dialog: MatDialog) {
        this.postService = _postService;
        this.snackBarHelper = _snackBarHelper;
        this.dialog1 = dialog;
        this.newPost = new Post();
    }
    ngOnInit() {
        this.thisUser = localStorage.getItem('email');
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
                this.postService.createPost(this.post)
                .subscribe(result => {
                    console.log(result);
                }, error => {
                    console.error(error);
                });
            }
            this.newPost = new Post();
        });
    }

    logSearch() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value)) {
            console.log(`User's search: ${this.value}`);
        }
        else {
            this.snackBarHelper.openSnackBar('Please provide a valid email when attempting to search for users', 'Close', 3000);
        }
    }
}


