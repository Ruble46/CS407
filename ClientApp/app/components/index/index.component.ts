import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";

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

    constructor(router: Router) {
        this.router1 = router;
    }

    ngOnInit() {

    }

    signIn() {
        console.log(this.emailSignIn + "," + this.passwordSignIn);
        this.router1.navigateByUrl('app/home');
    }

    signUp() {
        console.log(this.emailSignUp + "," + this.passwordSignUp + "," + this.passwordSignUpConfirm);
        this.router1.navigateByUrl('app/home');
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
