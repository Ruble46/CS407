import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../Models/Post';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../Services/PostService';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { HTTPStatus } from '../../../Services/HttpInterceptor';
import { RequestTracker } from '../../../Models/RequestTracker';
import { FriendsService } from '../../../Services/FriendsService';
import { FriendRequest } from '../../../Models/FriendRequest';
import { SnackBarHelper } from '../../../Helpers/SnackBars';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
    private currUser: string;
    mode = new FormControl('side');
    private router1: Router;
    private postService: PostService;
    private FriendsService: FriendsService;
    public posts: Array<Post>;
    platforms = new FormControl();
    platformList: string[] = ['Steam'];
    public filterGame: string;
    public filterMode: string;
    public postSubscription: any;
    public friendsSubscription: any;
    public invitesSubscription: any;
    public httpStatus: HTTPStatus;
    public sendRequestTo: string;
    private SnackBarHelper: SnackBarHelper;

    // public friends: Array<string> = ["kleaf.gbit@gmail.com", "womalley1495@gmail.com", "b.omalley95@yahoo.com", "esteban.sierram@gmail.com"];
    // public invites: Array<string> = ["bob@purdue.edu", "john@purdue.edu", "tom@purdue.edu", "chris@purdue.edu"];
    public friends: Array<string>;
    public invites: Array<string>;

    constructor(private _SnackBarHelper: SnackBarHelper, private _FriendsService: FriendsService, private _httpStatus: HTTPStatus, _postService: PostService, router: Router) {
        this.httpStatus = _httpStatus;
        this.router1 = router;
        this.postService = _postService;
        this.FriendsService = _FriendsService;
        this.posts = new Array<Post>();
        this.currUser = localStorage.getItem('email');
        this.friends = new Array<string>();
        this.invites = new Array<string>();
        this.SnackBarHelper = _SnackBarHelper;
    }

    ngOnInit() {
        document.getElementById('navBar').style.backgroundColor = "#34373c";

        this.friendsSubscription = timer(0, 10000).pipe(switchMap(() => this.FriendsService.getFriends(this.currUser)))
        .subscribe(result => {
            console.log(result);
            this.friends = result.body;
        }, error => {
            console.error(error);
        });

        this.invitesSubscription = timer(0, 10000).pipe(switchMap(() => this.FriendsService.getRequests(this.currUser)))
        .subscribe(result => {
            console.log(result);
            this.invites = result.body;
        }, error => {
            console.error(error);
        });

        //Watcher for creating a post
        this.httpStatus.getRequest()
        .subscribe((request: RequestTracker) => {
            if(request.URL && request.URL.indexOf('/api/post') > 0 && request.Method === 'POST') {
                this.postService.getAllPosts()
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
                });
            }
        });

        //Home post feed
        this.postSubscription = timer(0, 300000).pipe(switchMap(() => this.postService.getAllPosts())) //REMEMBE TO SWITCH BACK TO 5 SECONDS
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
        });
        
    }

    ngOnDestroy() {
        this.postSubscription.unsubscribe();
        this.friendsSubscription.unsubscribe();
        this.invitesSubscription.unsubscribe();
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

    requestChoice(choice: string, person: string) {
        if(choice === 'accept') {
            let request: FriendRequest = new FriendRequest();
            request.sender = person;
            request.receiver = this.currUser;
            this.FriendsService.acceptRequest(request)
            .subscribe(result => {
                this.FriendsService.getRequests(this.currUser)
                .subscribe(result => {
                    this.invites = result.body;
                }, error => {
                    console.error(error);
                });

                this.FriendsService.getFriends(this.currUser)
                .subscribe(result => {
                    this.friends = result.body;
                }, error => {
                    console.error(error);
                });
            }, error => {
                console.error(error);
            });
        } else {
            let request: FriendRequest = new FriendRequest();
            request.sender = person;
            request.receiver = this.currUser;
            this.FriendsService.ignoreRequest(request)
            .subscribe(result => {
                this.FriendsService.getRequests(this.currUser)
                .subscribe(result => {
                    this.invites = result.body;
                }, error => {
                    console.error(error);
                });
            }, error => {
                console.error(error);
            });
        }
    }

    sendFriendRequest() {
        let request: FriendRequest = new FriendRequest();
        request.sender = this.currUser;
        request.receiver = this.sendRequestTo;
        this.FriendsService.sendRequest(request)
        .subscribe(result => {
            this.sendRequestTo = '';
            this.SnackBarHelper.openSnackBar("A friend request has been sent to " + request.receiver + ".", "Dismiss", 4000);
        }, error => {
            console.error(error);
            if(error.error === "User not found") {
                this.SnackBarHelper.openSnackBar("The user " + request.receiver + " could not be found.", "Dismiss", 4000);
            }
        });
    }
}