import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { Rating } from '../../../Models/Rating';
import { RatingService } from '../../../Services/RatingService';

@Component({
    selector: 'profileRating',
    templateUrl: './profileRating.component.html',
    styleUrls: ['./profileRating.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileRatingComponent implements OnInit {
    public ratingTitle: string;
    public ratingDescription: string;
    public ratingView: string;

    private router1: Router;
    public ratingExists: boolean;
    public currUser: string;
    public thisUser: string;
    public ratings: Array<Rating>;
    public RatingService: RatingService;

    constructor(public _RatingService: RatingService, profile: ProfileComponent, router: Router) {
        profile.selected.setValue(3);
        this.thisUser = profile.email;
        this.router1 = router;
        this.ratingExists = false;
        this.currUser = localStorage.getItem("email");
        this.ratings = new Array<Rating>();
        this.RatingService = _RatingService;
    }

    ngOnInit() {
        this.RatingService.getRatingForUser(this.thisUser)
        .subscribe(result => {
            this.ratings = result.body;
            for (let i = 0; i < this.ratings.length; i++) {
                if (this.ratings[i].author === this.currUser) {
                    this.ratingExists = true;
                    break;
                }
            }
        }, error => {
            console.error(error);
        });
    }
    
    toProfile(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/posts');
    }

    submitRating() {
        let rating: Rating = new Rating();
        rating.author = this.currUser;
        rating.description = this.ratingDescription;
        if(this.ratingView === "Positive") {
            rating.rate = 1;
        } else if(this.ratingView === "Neutral") {
            rating.rate = 0;
        } else {
            rating.rate = -1;
        }
        rating.rated = this.thisUser;
        rating.title = this.ratingTitle;
        this.RatingService.newRating(rating)
        .subscribe(result => {
            this.ratingExists = true;
            this.RatingService.getRatingForUser(this.thisUser)
            .subscribe(result => {
                this.ratings = result.body;
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
    }

    public views: Array<View> = [
        {icon: 'thumb_up', view: 'Positive'},
        {icon: 'thumbs_up_down', view: 'Neutral'},
        {icon: 'thumb_down', view: 'Negative'}
    ]

    // public ratings: Array<Rating> = [
    //     { id: "", title: 'This is title fillllllllllllllllllllller... yeah', rating: 1, desc: 'this is description stuff', rated: 'womalley1495@gmail.com', author: 'RRRuble46@hotmail.com', creationDate: new Date()},
    //     { id: "", title: 'This is title filllllllllllller... yeah', rating: 0, desc: 'this is description stuff2', rated: 'womalley1495@gmail.com', author: 'craigruble1995@gmail.com', creationDate: new Date()},
    //     { id: "", title: 'This is title filler... yeah', rating: -1, desc: 'this is description stuff3', rated: 'womalley1495@gmail.com', author: 'womalley1495@gmail.com', creationDate: new Date()},
    // ]
}

export interface View {
    icon: string;
    view: string;
}