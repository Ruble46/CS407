import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../themes/theme.css', './profile.component.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileComponent implements OnInit {
    public email: string;
    private router1: Router;
    public selected = new FormControl(0);

    constructor(private route: ActivatedRoute, private router: Router) {
        this.router1 = router;
        route.params.subscribe((params) => {
            this.email = params["email"];
        });
    }
    
    ngOnInit() {
        document.getElementById('navBar').style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    onLinkClick(event: MatTabChangeEvent) {
        if(event.tab.textLabel === 'Posts') {
            this.router1.navigateByUrl('app/profile/' + this.email + '/posts');
        } else if(event.tab.textLabel === 'Gaming') {
            this.router1.navigateByUrl('app/profile/' + this.email + '/gaming');
        } else if(event.tab.textLabel === 'Chat') {
            this.router1.navigateByUrl('app/profile/' + this.email + '/chat');
        } else if(event.tab.textLabel === 'Rating') {
            this.router1.navigateByUrl('app/profile/' + this.email + '/rating');
        }
      }
}