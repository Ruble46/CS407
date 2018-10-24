import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { PostService } from '../../../Services/PostService';
import { Post } from '../../../Models/Post';

@Component({
    selector: 'profilePosts',
    templateUrl: './profilePosts.component.html',
    styleUrls: ['./profilePosts.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfilePostsComponent implements OnInit {
    private router1: Router;
    private postService: PostService;
    public posts: Array<Post>;
    private p: ProfileComponent;

    constructor(_postService: PostService, profile: ProfileComponent, router: Router) {
        this.p = profile;
        this.postService = _postService;
        profile.selected.setValue(0);
        this.router1 = router;
        this.posts = new Array<Post>();
    }

    ngOnInit() {
        this.postService.getPostByEmail(this.p.email)
        .subscribe(result => {
            for(let a = 0; a < result.body.length; a++) {
                var newPost: Post = new Post();
                newPost.Creator = result.body[a].email;
                newPost.Description = result.body[a].content;
                newPost.Game = result.body[a].game;
                newPost.Mode = result.body[a].gameType;
                newPost.Platform = result.body[a].platform;
                newPost.Title = result.body[a].title;
                newPost.ID = result.body[a].id;
                this.posts.push(newPost);
                newPost = null;
            }

        }, error => {
            console.error(error);
        });
    }
}