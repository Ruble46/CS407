import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Post } from '../../../Models/Post';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
    private router1: Router;
    public posts: Array<Post>;
    platforms = new FormControl();
    platformList: string[] = ['Steam'];

    public filterGame: string;
    public filterMode: string;

    constructor(router: Router) {
        this.router1 = router;
        var names: Array<string> = ["craigruble1995@gmail.com", "b.omalley95@yahoo.com", "tom@purdue.edu", "aaron@purdue.edu", "craig@purdue.edu"];
        var modes: Array<string> = ["PVP", "PVE", "Ranked", "Casual", "Sandbox"];
        var games: Array<string> = ["The Division", "Goat Simulator", "Rainbow Six Siege", "Rocket League", "Garrys Mod"];
        this.posts = new Array<Post>();
        for(var a = 0; a < 5; a++) {
            var post: Post = new Post();
            post.Title = "Example Title " + (a + 1);
            post.Creator = names[a];
            post.Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            post.Mode = modes[a];
            post.Game = games[a];
            post.Platform = "Steam";
            this.posts.push(post);
            post = null;
        }
    }

    ngOnInit() {
        document.getElementById('navBar').style.backgroundColor = "#34373c";
    }

    toProfile(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/posts');
    }

    toProfileChat(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/chat');
    }

    filterFeed() {
        console.log(this.platforms.value);
        console.log(this.filterGame);
        console.log(this.filterMode);
    }
}
