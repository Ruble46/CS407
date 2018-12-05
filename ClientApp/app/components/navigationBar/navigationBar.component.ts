import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Post } from '../../../Models/Post';
import { NewPostDialogComponent } from '../newPostDialog/newPostDialog.component';
import { SnackBarHelper } from '../../../Helpers/SnackBars';
import { PostService } from '../../../Services/PostService';
import { UserService } from '../../../Services/UserService';
import { Router } from '@angular/router';

@Component({
    selector: 'navigationBar',
    templateUrl: './navigationBar.component.html',
    styleUrls: ['./navigationBar.component.css', '../../../themes/theme.css'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements OnInit {
    private router: Router;
    private postService: PostService;
    private userService: UserService;
    public dialog1: MatDialog;
    public newPost: Post;
    public post: Post;
    public snackBarHelper: SnackBarHelper;
    public value: string;
    public thisUserRole: string;

    constructor(private _router: Router, private _userService: UserService, private _postService: PostService, public _snackBarHelper: SnackBarHelper, public dialog: MatDialog) {
        this.router = _router;
        this.userService = _userService;
        this.postService = _postService;
        this.snackBarHelper = _snackBarHelper;
        this.dialog1 = dialog;
        this.newPost = new Post();
    }
    ngOnInit() {
        this.thisUserRole = localStorage.getItem('role');
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
            this.userService.getUser(this.value)
            .subscribe(result => {
                this.router.navigateByUrl('app/profile/' + this.value + '/posts');
                this.value = "";
            }, error => {
                console.error(error);
                this.snackBarHelper.openSnackBar('The user ' + this.value + ' does not exist.', 'Close', 3000);
            });

        }
        else {
            this.snackBarHelper.openSnackBar('Please provide a valid email when attempting to search for users', 'Close', 3000);
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('');
    }
}


