import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { Rating } from '../../../Models/Rating';

@Component({
    selector: 'accountRating',
    templateUrl: './accountRating.component.html',
    styleUrls: ['./accountRating.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountRatingComponent {
    public ratingTitle: string;
    public ratingDescription: string;
    public ratingView: string;

    private router1: Router;

    constructor(profile: AccountComponent, router: Router) {
        profile.selected.setValue(2);
        this.router1 = router;
    }
    
    toProfile(email) {
        this.router1.navigateByUrl('app/account/posts');
    }

    submitRating() {
        console.log(this.ratingTitle + ',' + this.ratingDescription + ',' + this.ratingView);
    }

    public ratings: Array<Rating> = [
        { title: 'This is title fillllllllllllllllllllller... yeah', rating: 1, desc: 'this is description stuff', rated: 'womalley1495@gmail.com', author: 'ruble46@hotmail.com', creationDate: new Date()},
        { title: 'This is title filllllllllllller... yeah', rating: 0, desc: 'this is description stuff2', rated: 'womalley1495@gmail.com', author: 'craigruble1995@gmail.com', creationDate: new Date()},
        { title: 'This is title filler... yeah', rating: -1, desc: 'this is description stuff3', rated: 'womalley1495@gmail.com', author: 'womalley1495@gmail.com', creationDate: new Date()},

    ]
}
