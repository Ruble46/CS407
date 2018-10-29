import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Post } from '../../../Models/Post';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../Services/PostService';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
    private router1: Router;
    private postService: PostService;
    public posts: Array<Post>;
    platforms = new FormControl();
    platformList: string[] = ['Steam'];

    public filterGame: string;
    public filterMode: string;

    constructor(_postService: PostService, router: Router) {
        this.router1 = router;
        this.postService = _postService;
        this.posts = new Array<Post>();
    }

    ngOnInit() {
        document.getElementById('navBar').style.backgroundColor = "#34373c";
        timer(0, 30000).pipe(switchMap(() => this.postService.getAllPosts())) //REMEMBE TO SWITCH BACK TO 5 SECONDS
        .subscribe(result => {
            console.log('timer test print');
            this.posts = null;
            this.posts = new Array<Post>();
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

    toProfile(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/posts');
    }

    toProfileChat(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/chat');
    }

    filterFeed() {
        let platform: string;
        if(!this.platforms.value) {
            platform = "";
        } else {
            platform = this.platforms.value[0];
        }

        this.postService.filterPosts(this.filterGame, this.filterMode, platform)
        .subscribe(result => {
            this.posts = null;
            this.posts = new Array<Post>();
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
        })
    }
}