import { Component, ViewEncapsulation } from '@angular/core';

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

    constructor() {
        
    }

    signIn() {
        console.log(this.emailSignIn + "," + this.passwordSignIn);
    }

    signUp() {
        console.log(this.emailSignUp + "," + this.passwordSignUp + "," + this.passwordSignUpConfirm);
    }

}
