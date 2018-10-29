import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../Services/LoginRegisterService';
import * as $ from "jquery";
import { MatSnackBar } from '@angular/material';
import { SnackBarHelper } from '../../../Helpers/SnackBars';
import { AccountService } from '../../../Services/AccountService';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None

})
export class IndexComponent {
    public emailSignIn: string;
    public passwordSignIn: string;

    public emailSignUp: string;
    public passwordSignUp: string;
    public passwordSignUpConfirm: string;

    private router1: Router;
    private service1: LoginRegisterService;
    private service2: AccountService;
    //public snackBar: MatSnackBar;
    public snackBarHelper: SnackBarHelper;

    constructor(private AccountService: AccountService, public _snackBarHelper: SnackBarHelper, private LoginRegisterService: LoginRegisterService, router: Router) {
        this.snackBarHelper = _snackBarHelper;
        this.service1 = LoginRegisterService;
        this.service2 = AccountService;
        this.router1 = router;
        this.emailSignIn = this.passwordSignIn = this.emailSignUp = this.passwordSignUp = this.passwordSignUpConfirm = '';
    }

    signIn() {
        if(this.emailSignIn !== '' && this.emailSignIn !== null && this.passwordSignIn !== '' && this.passwordSignIn !== null) {
            this.service1.signIn(this.emailSignIn, this.passwordSignIn)
            .subscribe(result => {
                localStorage.setItem('email', this.emailSignIn);
                this.service2.getUserRole(this.emailSignIn)
                .subscribe(result => {
                    console.log(result);
                    let isAdmin: boolean = false;
                    for(let a = 0; a < result.length; a++) {
                        if(result[a] === 'Admin') {
                            isAdmin = true;
                            break;
                        }
                    }
                    if(isAdmin) {
                        localStorage.setItem('role', 'Admin');
                    } else {
                        localStorage.setItem('role', 'User');
                    }
                    this.router1.navigateByUrl('app/home');
                }, error => {
                    console.error(error);
                })
            }, error => {
                this.snackBarHelper.openSnackBar(error.error, 'Close', 3000);
                console.error(error);
            });
        } else {
            this.snackBarHelper.openSnackBar('Please provide an email and password when attempting to sign in.', 'Close', 5000);
        }
    }

    signUp() {
        if(this.passwordSignUp === this.passwordSignUpConfirm) {
            this.service1.signUp(this.emailSignUp, this.passwordSignUp)
            .subscribe(result => {
                localStorage.setItem('email', this.emailSignUp);
                this.router1.navigateByUrl('app/home');
            }, error => {
                console.error(error);
                if(error.error.length > 1) {
                    var errorString: string = '';
                    for(var a = 0; a < error.error.length; a++) {
                        errorString += error.error[a].description;
                    }
                    this.snackBarHelper.openSnackBar(errorString, 'Close', error.error.length * 2200);
                } else { 
                    this.snackBarHelper.openSnackBar(error.error[0].description, 'Close', 4000);
                }
            });
        } else {
            this.snackBarHelper.openSnackBar('The passwords provided do not match.', 'Close', 4000);
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
