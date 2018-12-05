import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { SelfService } from '../../../Services/SelfService';
import { MessagesService } from '../../../Services/MessagesService';
import { Message } from '../../../Models/Message';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Friend } from '../../../Models/Friend';
import { FriendsService } from '../../../Services/FriendsService';

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
    private check: boolean;
    private friendsSubscription;
    public CHATS: Array<Friend>;
    private FriendsService: FriendsService;
    public areFriends: boolean;
    public myProfile: boolean;

    constructor(private _FriendsService: FriendsService, private _MessagesService: MessagesService, private s: SelfService, private router: Router, profile: ProfileComponent) {
        this.selfService = s;
        this.router1 = router;
        this.MessagesService = _MessagesService;
        this.messages = new Array<Message>();
        this.p = profile;
        this.FriendsService = _FriendsService;
        this.areFriends = false;
        this.myProfile = false;
        profile.selected.setValue(2);
    }

    getBackgroundStyle(email: string) {
        let bc: string = localStorage.getItem('backgroundColor');
        if(email === this.currUser && bc.length > 0) {
            return bc;
        } else if(email === this.currUser) {
            return "#ffedd0";
        } else {
            return "white";
        }
    }

    getFontColor(email: string) {
        let fc: string = localStorage.getItem('chatColor');
        if(email === this.currUser && fc.length > 0) {
            return fc;
        } else {
            return "black";
        }
    }

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    ngOnInit() { 
        this.currUser = localStorage.getItem('email');
        if(this.p.email === this.currUser) {
            this.myProfile = true;
        }
        this.scrollToBottom();

        this.messageSubscription = timer(0, 3000).pipe(switchMap(() => this.MessagesService.getConversation(this.currUser, this.p.email)))
        .subscribe(result => {
            let newMessages: boolean = false;
            if(this.messages.length < result.length) {
                newMessages = true;
            }
            this.messages = result;

            if(newMessages) {
                this.check = true; 
            }

            let temp: Message = new Message();
            temp.sender = this.p.email;
            temp.receiver = this.currUser;
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

        this.friendsSubscription = timer(0, 10000).pipe(switchMap(() => this.FriendsService.getFriends(this.currUser)))
        .subscribe(result => {
            this.CHATS = new Array<Friend>();
            for(let a = 0; a < result.body.length; a++) {
                let email: string = result.body[a];
                let friend: Friend = new Friend();
                friend.email = email;

                if(email === this.p.email) {
                    this.areFriends = true;
                }

                if(email !== this.p.email) {
                    this.MessagesService.getUnread(this.currUser)
                    .subscribe(result => {
                        if(result) {
                            friend.unread = result.length;
                        } else {
                            friend.unread = 0;
                        }
                        this.CHATS.push(friend);
                    }, error => {
                        console.error(error);
                    });
                }
            }
        }, error => {
            console.error(error);
        });
    }

    ngAfterViewChecked() {        
        if(this.check == true) {
            this.scrollToBottom();  
        }
        this.check = false;  
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
        this.friendsSubscription.unsubscribe();
    }
}

export interface Chats {
    email: string;
    unread: number;
}