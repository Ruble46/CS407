import { Component, ViewEncapsulation } from '@angular/core';
import { AccountComponent } from '../account/account.component';

@Component({
    selector: 'accountGaming',
    templateUrl: './accountGaming.component.html',
    styleUrls: ['./accountGaming.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountGamingComponent {

    constructor(profile: AccountComponent) {
        profile.selected.setValue(1);
    }
}