import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None

})
export class AppComponent {
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
