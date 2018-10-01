import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../Services/LoginRegisterService';

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

    constructor(private LoginRegisterService: LoginRegisterService, router: Router) {
        this.service1 = LoginRegisterService;
        this.router1 = router;
    }

    ngOnInit() {

    }

    signIn() {
        this.service1.signIn(this.emailSignIn, this.passwordSignIn)
        .subscribe(result => {
            //this.router1.navigateByUrl('app/home');
            console.log('LOGIN SUCCESSFUL');
        }, error => {
            //ADD MATSNACKBAR FOR ERRORO MESSAGE
            console.error(error);
        })
    }

    signUp() {
        if(this.passwordSignUp === this.passwordSignUpConfirm) {
            this.service1.signUp(this.emailSignUp, this.passwordSignUp)
            .subscribe(result => {
                this.router1.navigateByUrl('app/home');
            }, error => {
                console.error(error);
            });
        } else {
            //ADD MATSNACKBAR FOR ERROR MESSAGE
            console.error('PASSWORDS DO NOT MATCH');
        }
    }

}
