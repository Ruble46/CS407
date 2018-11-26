import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { Rating } from '../../../Models/Rating';
import { RatingService } from '../../../Services/RatingService';
import { timestamp } from 'rxjs/operators';

@Component({
    selector: 'accountRating',
    templateUrl: './accountRating.component.html',
    styleUrls: ['./accountRating.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountRatingComponent implements OnInit{
    public ratingTitle: string;
    public ratingDescription: string;
    public ratingView: string;
    public ratings: Array<Rating>;

    private router1: Router;
    private RatingService: RatingService;

    constructor(private _RatingService: RatingService, profile: AccountComponent, router: Router) {
        profile.selected.setValue(2);
        this.router1 = router;
        this.RatingService = _RatingService;
        this.ratings = new Array<Rating>();
    }
    
    ngOnInit() {
        let email: string = localStorage.getItem('email');
        this.RatingService.getRatingForUser(email)
        .subscribe(result => {
            this.ratings = result.body;
        }, error => {
            console.error(error);
        });
    }

    toProfile(email) {
        this.router1.navigateByUrl('app/account/posts');
    }

    submitRating() {
        console.log(this.ratingTitle + ',' + this.ratingDescription + ',' + this.ratingView);
    }

    // public ratings: Array<Rating> = [
    //     { id: "", title: 'This is title fillllllllllllllllllllller... yeah', rating: 1, desc: 'this is description stuff', rated: 'womalley1495@gmail.com', author: 'ruble46@hotmail.com', creationDate: new Date()},
    //     { id: "", title: 'This is title filllllllllllller... yeah', rating: 0, desc: 'this is description stuff2', rated: 'womalley1495@gmail.com', author: 'craigruble1995@gmail.com', creationDate: new Date()},
    //     { id: "", title: 'This is title filler... yeah', rating: -1, desc: 'this is description stuff3', rated: 'womalley1495@gmail.com', author: 'womalley1495@gmail.com', creationDate: new Date()},

    // ]
}
