import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';

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

    public views: Array<Views> = [
        {icon: 'thumb_up', view: 'Positive'},
        {icon: 'thumbs_up_down', view: 'Neutral'},
        {icon: 'thumb_down', view: 'Negative'}
    ]
}

export interface Views {
    icon: string;
    view: string;
}