import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SelfService } from '../../../Services/SelfService';
import { MatTabChangeEvent } from '@angular/material';
import { AccountService } from '../../../Services/AccountService';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountComponent {
    private selfService: SelfService;
    public email: string;
    public AccountCreated: Date;
    private router1: Router;
    public selected = new FormControl(0);
    private AccountService: AccountService;

    constructor(_AccountService: AccountService, s: SelfService, private router: Router) {
        this.AccountService = _AccountService;
        this.router1 = router;
        this.email = localStorage.getItem('email');
    }
    
    ngOnInit() {
        this.AccountService.getAccount(this.email)
        .subscribe(result => {
            this.AccountCreated = result.body.accountCreated;
        }, error => {
            console.error(error);
        });
        document.getElementById('navBar').style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    onLinkClick(event: MatTabChangeEvent) {
        if(event.tab.textLabel === 'Posts') {
            this.router1.navigateByUrl('app/account/posts');
        } else if(event.tab.textLabel === 'Gaming') {
            this.router1.navigateByUrl('app/account/gaming');
        } else if(event.tab.textLabel === 'Settings') {
            this.router1.navigateByUrl('app/account/settings');
        } else if(event.tab.textLabel === 'Rating') {
            this.router1.navigateByUrl('app/account/rating');
        }
    }
}