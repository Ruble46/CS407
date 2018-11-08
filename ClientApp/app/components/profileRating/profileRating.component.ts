import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { Rating } from '../../../Models/Rating';

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

    constructor(profile: ProfileComponent, router: Router) {
        profile.selected.setValue(3);
        this.router1 = router;
        this.ratingExists = false;
        this.currUser = localStorage.getItem("email");
    }

    ngOnInit() {
        for (let i = 0; i < this.ratings.length; i++) {
            if (this.ratings[i].author === this.currUser) {
                this.ratingExists = true;
                break;
            }
        }
    }
    
    toProfile(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/posts');
    }

    submitRating() {
        console.log(this.ratingTitle + ',' + this.ratingDescription + ',' + this.ratingView);
    }

    public views: Array<View> = [
        {icon: 'thumb_up', view: 'Positive'},
        {icon: 'thumbs_up_down', view: 'Neutral'},
        {icon: 'thumb_down', view: 'Negative'}
    ]

    public ratings: Array<Rating> = [
        { title: 'This is title fillllllllllllllllllllller... yeah', rating: 1, desc: 'this is description stuff', rated: 'womalley1495@gmail.com', author: 'RRRuble46@hotmail.com', creationDate: new Date()},
        { title: 'This is title filllllllllllller... yeah', rating: 0, desc: 'this is description stuff2', rated: 'womalley1495@gmail.com', author: 'craigruble1995@gmail.com', creationDate: new Date()},
        { title: 'This is title filler... yeah', rating: -1, desc: 'this is description stuff3', rated: 'womalley1495@gmail.com', author: 'womalley1495@gmail.com', creationDate: new Date()},

    ]
}

export interface View {
    icon: string;
    view: string;
}