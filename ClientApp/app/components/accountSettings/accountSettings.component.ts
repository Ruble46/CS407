import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';

@Component({
    selector: 'accountSettings',
    templateUrl: './accountSettings.component.html',
    styleUrls: ['./accountSettings.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountSettingsComponent {
    private router1: Router;
    public currentPassword: string;
    public newPassword: string;
    public chatBackground: string;
    public chatFontColor: string;

    constructor(private router: Router, profile: AccountComponent) {
        this.router1 = router;
        profile.selected.setValue(3);
    }
}