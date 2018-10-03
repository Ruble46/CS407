import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { AccountService } from '../../../Services/AccountService';
import { MatSnackBar } from '@angular/material';

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
    private AccountService: AccountService;
    public snackBar: MatSnackBar;

    constructor(public _snackBar: MatSnackBar, _AccountService:AccountService, private router: Router, profile: AccountComponent) {
        this.snackBar = _snackBar;
        this.AccountService = _AccountService;
        this.router1 = router;
        profile.selected.setValue(3);
    }

    openSnackBar(message: string, action: string, lengthMs: number) {
        this.snackBar.open(message, action, {
            duration: lengthMs,
        });
    }

    saveSettings() {
        var email: string = localStorage.getItem('email');
        this.AccountService.accountSettings(email, this.chatBackground, this.chatFontColor)
        .subscribe(result => {
            this.openSnackBar('Save Successful', 'Close', 2500);
        }, error => {
            this.openSnackBar('An error has occurred. Please check the console.', 'Close', 3500);
        });
    }
}