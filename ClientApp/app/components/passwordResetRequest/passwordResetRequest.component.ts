import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'passwordResetRequest',
    templateUrl: './passwordResetRequest.component.html',
    styleUrls: ['../../../themes/theme.css', './passwordResetRequest.component.css'],
    encapsulation : ViewEncapsulation.None
})
export class PasswordResetRequestComponent {
    public email: string;
    
    constructor() {
        
    }

    passwordResetRequest() {
        
    }
}