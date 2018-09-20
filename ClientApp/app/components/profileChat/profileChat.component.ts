import { Component, ViewEncapsulation } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'profileChat',
    templateUrl: './profileChat.component.html',
    styleUrls: ['./profileChat.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileChatComponent {

    constructor(profile: ProfileComponent) {
        profile.selected.setValue(2);
    }
}