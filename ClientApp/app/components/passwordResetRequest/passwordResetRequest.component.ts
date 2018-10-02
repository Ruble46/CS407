import { Component, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../../../Services/AccountService';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'passwordResetRequest',
    templateUrl: './passwordResetRequest.component.html',
    styleUrls: ['../../../themes/theme.css', './passwordResetRequest.component.css'],
    encapsulation : ViewEncapsulation.None
})
export class PasswordResetRequestComponent {
    public email: string;
    private service1: AccountService;
    private router1: Router;
    private snackBar: MatSnackBar;
    
    constructor(public _snackBar: MatSnackBar, private router: Router, private AccountService: AccountService) {
        this.router1 = router;
        this.service1 = AccountService;
    }

    passwordResetRequest() {
        this.service1.passwordResetRequest(this.email)
        .subscribe(result => {
            this.router1.navigateByUrl('');
        }, error => {
            console.error(error);
            this.openSnackBar('An error has occured. Please check the console for more information', 'Close', 4000);
        });
    }

    openSnackBar(message: string, action: string, lengthMs: number) {
        this.snackBar.open(message, action, {
            duration: lengthMs,
        });
    }
}