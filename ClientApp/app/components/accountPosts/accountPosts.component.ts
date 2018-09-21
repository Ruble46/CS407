import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';

@Component({
    selector: 'accountPosts',
    templateUrl: './accountPosts.component.html',
    styleUrls: ['./accountPosts.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})

export class AccountPostsComponent {
    private router1: Router;

    constructor(profile: AccountComponent, router: Router) {
        profile.selected.setValue(0);
        this.router1 = router;
    }
    
    toProfile(email) {
        this.router1.navigateByUrl('app/account/posts');
    }
}