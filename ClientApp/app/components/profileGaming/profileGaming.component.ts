import { Component, ViewEncapsulation } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'profileGaming',
    templateUrl: './profileGaming.component.html',
    styleUrls: ['./profileGaming.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileGamingComponent {

    constructor(profile: ProfileComponent) {
        profile.selected.setValue(1);
    }
}