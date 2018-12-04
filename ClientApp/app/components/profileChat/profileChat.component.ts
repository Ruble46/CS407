import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { SelfService } from '../../../Services/SelfService';
import { MessagesService } from '../../../Services/MessagesService';
import { Message } from '../../../Models/Message';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
    selector: 'profileChat',
    templateUrl: './profileChat.component.html',
    styleUrls: ['./profileChat.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileChatComponent implements OnInit {
    private router1: Router;
    private selfService: SelfService;
    private MessagesService: MessagesService;
    public messages: Array<Message>;
    private p: ProfileComponent;
    private currUser: string;
    public message: string;
    public messageSubscription: any;

    constructor(private _MessagesService: MessagesService, private s: SelfService, private router: Router, profile: ProfileComponent) {
        this.selfService = s;
        this.router1 = router;
        this.MessagesService = _MessagesService;
        this.messages = new Array<Message>();
        this.p = profile;
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
        this.currUser = localStorage.getItem('email');
        this.scrollToBottom();

        this.messageSubscription = timer(0, 3000).pipe(switchMap(() => this.MessagesService.getConversation(this.currUser, this.p.email)))
        .subscribe(result => {
            this.messages = result;
            this.scrollToBottom(); 

            let temp: Message = new Message();
            temp.sender = this.currUser;
            temp.receiver = this.p.email;
            temp.content = "marking messages as read";

            this.MessagesService.markRead(temp)
            .subscribe(result => {
                console.log(result);
            }, error => {
                console.error(error);
            })
        }, error => {
            console.error(error);
        });
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

    sendMessage() {
        let message: Message = new Message();
        message.sender = this.currUser;
        message.receiver = this.p.email;
        message.content = this.message;
        this.message = "";

        this.MessagesService.sendMessage(message)
        .subscribe(result => {
            this.MessagesService.getConversation(this.currUser, this.p.email)
            .subscribe(result => {
                this.messages = result;
                this.scrollToBottom();
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
    }

    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
    }

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