import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { SelfService } from '../../../Services/SelfService';

@Component({
    selector: 'profileChat',
    templateUrl: './profileChat.component.html',
    styleUrls: ['./profileChat.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileChatComponent {
    private router1: Router;
    private selfService: SelfService;

    constructor(private s: SelfService, private router: Router, profile: ProfileComponent) {
        this.selfService = s;
        this.router1 = router;
        profile.selected.setValue(2);
    }

    getStyle(email: string) {
        if(email === this.selfService.currentUser) {
            return "#ffedd0";
        } else {
            return "white";
        }
    }

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    ngOnInit() { 
        this.scrollToBottom();
    }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

    toProfile(email) {
        this.router1.navigateByUrl('app/profile/' + email + '/chat');
    }

    public MESSAGES: Array<Message> = [
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 1'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 2'},
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 3'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 4'},
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 5'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 6'},
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 5'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 6'},
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 7'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 8'},
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 9'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 10'},
        {email: 'bob@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 11'},
        {email: 'craig@purdue.edu', date: new Date().toLocaleString(), message: 'this is message 12'},
    ];

    public CHATS: Array<Chats> = [
        {email: 'bob@purdue.edu', unread: 2},
        {email: 'aaron@purdue.edu', unread: 10},
        {email: 'tom@purdue.edu', unread: 1},
        {email: 'craig@purdue.edu', unread: 0},
        {email: 'bob@purdue.edu', unread: 2},
        {email: 'aaron@purdue.edu', unread: 10},
        {email: 'tom@purdue.edu', unread: 1},
        {email: 'craig@purdue.edu', unread: 0},
        {email: 'bob@purdue.edu', unread: 2},
        {email: 'aaron@purdue.edu', unread: 10},
        {email: 'tom@purdue.edu', unread: 1},
        {email: 'craig@purdue.edu', unread: 0},
        {email: 'bob@purdue.edu', unread: 2},
        {email: 'aaron@purdue.edu', unread: 10},
        {email: 'tom@purdue.edu', unread: 1},
        {email: 'craig@purdue.edu', unread: 0},
    ];
}

export interface Chats {
    email: string;
    unread: number;
}

export interface Message {
    email: string;
    date: string;
    message: string;
}