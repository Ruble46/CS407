import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'profileRating',
    templateUrl: './profileRating.component.html',
    styleUrls: ['./profileRating.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileRatingComponent {
    public ratingTitle: string;
    public ratingDescription: string;
    public ratingView: string;

    private router1: Router;

    constructor(profile: ProfileComponent, router: Router) {
        profile.selected.setValue(3);
        this.router1 = router;
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
}

export interface View {
    icon: string;
    view: string;
}