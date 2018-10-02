import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../Services/AccountService';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'passwordReset',
    templateUrl: './passwordReset.component.html',
    styleUrls: ['../../../themes/theme.css', './passwordReset.component.css'],
    encapsulation : ViewEncapsulation.None
})
export class PasswordResetComponent {
    public password: string;
    public passwordConfirm: string;
    public email: string;
    public token: string;
    private service1: AccountService;
    private snackBar: MatSnackBar;
    private router: Router;

    constructor (private _router: Router, public _snackBar: MatSnackBar, private AccountService: AccountService, private route: ActivatedRoute) {
        this.snackBar = _snackBar;
        this.router = _router;
        this.service1 = AccountService;
        route.params.subscribe((params) => {
            this.email = params["email"];
            this.token = params["token"];
        });
    }

    passwordReset() {
        if(this.password === this.passwordConfirm)
        {
            this.service1.passwordReset(this.email, this.password, this.token)
            .subscribe(result => {
                this.router.navigateByUrl('app/home');
            }, error => {
                console.error(error);
                if(error.error.errors.length > 1) {
                    var errorString: string = '';
                    for(var a = 0; a < error.error.errors.length; a++) {
                        errorString += error.error.errors[a].description;
                    }
                    this.openSnackBar(errorString, 'Close', error.error.errors.length * 2200);
                } else { 
                    this.openSnackBar(error.error.errors[0].description, 'Close', 4000);
                }
            });
        } else {
            this.openSnackBar('The passwords provided do not match.', 'Close', 4000);
        }
    }

    openSnackBar(message: string, action: string, lengthMs: number) {
        this.snackBar.open(message, action, {
            duration: lengthMs,
        });
    }
}