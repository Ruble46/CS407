import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'profilePosts',
    templateUrl: './profilePosts.component.html',
    styleUrls: ['./profilePosts.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfilePostsComponent {
    private router1: Router;

    constructor(profile: ProfileComponent, router: Router) {
        profile.selected.setValue(0);
        this.router1 = router;
    }
}