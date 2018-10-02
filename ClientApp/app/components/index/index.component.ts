import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../Services/LoginRegisterService';
import * as $ from "jquery";
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None

})
export class IndexComponent implements OnInit {
    public emailSignIn: string;
    public passwordSignIn: string;

    public emailSignUp: string;
    public passwordSignUp: string;
    public passwordSignUpConfirm: string;

    private router1: Router;
    private service1: LoginRegisterService;
    public snackBar: MatSnackBar;

    constructor(public _snackBar: MatSnackBar, private LoginRegisterService: LoginRegisterService, router: Router) {
        this.snackBar = _snackBar;
        this.service1 = LoginRegisterService;
        this.router1 = router;
        this.emailSignIn = this.passwordSignIn = this.emailSignUp = this.passwordSignUp = this.passwordSignUpConfirm = '';
    }

    ngOnInit() {

    }

    openSnackBar(message: string, action: string, lengthMs: number) {
        this.snackBar.open(message, action, {
            duration: lengthMs,
        });
    }

    signIn() {
        if(this.emailSignIn !== '' && this.emailSignIn !== null && this.passwordSignIn !== '' && this.passwordSignIn !== null) {
            console.log("here valid");
            console.log(this.emailSignIn + ", " + this.passwordSignIn);
            this.service1.signIn(this.emailSignIn, this.passwordSignIn)
            .subscribe(result => {
                this.router1.navigateByUrl('app/home');
            }, error => {
                this.openSnackBar(error.error, 'Close', 3000);
                console.error(error);
            });
        } else {
            this.openSnackBar('Please provide an email and password when attempting to sign in.', 'Close', 5000);
        }
    }

    signUp() {
        if(this.passwordSignUp === this.passwordSignUpConfirm) {
            this.service1.signUp(this.emailSignUp, this.passwordSignUp)
            .subscribe(result => {
                this.router1.navigateByUrl('app/home');
            }, error => {
                if(error.error.length > 1) {
                    var errorString: string = '';
                    for(var a = 0; a < error.error.length; a++) {
                        errorString += error.error[a].description;
                    }
                    this.openSnackBar(errorString, 'Close', error.error.length * 2200);
                } else { 
                    this.openSnackBar(error.error[0], 'Close', 4000);
                }
            });
        } else {
            this.openSnackBar('The passwords provided do not match.', 'Close', 4000);
        }
    }

    signUpFacebook() {
        var data = {};
        $.ajax({
            type: "POST",
            url: "http://localhost:58619/api/account/external",
            data: data,
            dataType: "json"
        });
    }

}
