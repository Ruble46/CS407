import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../themes/theme.css', './profile.component.css'],
    encapsulation : ViewEncapsulation.None
})
export class ProfileComponent {
    public email: string;

    constructor(private route: ActivatedRoute) {
        route.params.subscribe((params) => {
            this.email = params["email"]
        });
    }
}