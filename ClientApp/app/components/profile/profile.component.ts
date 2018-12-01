import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../Services/UserService';
import { ReportUser } from '../../../Models/ReportUser';
import { ReportUserComponent } from '../reportUserDialog/reportUserDialog.component';
import { ReportsService } from '../../../Services/ReportsService';
import { FriendsService } from '../../../Services/FriendsService';
import { FriendRequest } from '../../../Models/FriendRequest';
import { RequestTracker } from '../../../Models/RequestTracker';
import { AccountService } from '../../../Services/AccountService';
import { SnackBarHelper } from '../../../Helpers/SnackBars';
import { PromoteDemoteDialogComponent } from '../promoteDemoteDialog/promoteDemoteDialog.component';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../themes/theme.css', './profile.component.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileComponent implements OnInit {
    private reportsService: ReportsService;
    public email: string;
    public AccountCreated: Date;
    private router1: Router;
    public selected = new FormControl(0);
    private UserService: UserService;
    private AccountService: AccountService;
    public dialog1: MatDialog;
    public newReport: ReportUser;
    public report: ReportUser;
    private FriendsService: FriendsService;
    public areFriends: boolean = false;
    public currIsAdmin: boolean = false;
    public userIsAdmin: boolean = false;
    public isYourOwn: boolean = false;
    private SnackBarHelper: SnackBarHelper;

    constructor(private _SnackBarHelper: SnackBarHelper, private _AccountService: AccountService, private _FriendsService: FriendsService, _reportsService: ReportsService, public dialog: MatDialog, _UserService: UserService, private route: ActivatedRoute, private router: Router) {
        this.reportsService = _reportsService;
        this.dialog1 = dialog;
        this.newReport = new ReportUser();
        this.UserService = _UserService;
        this.AccountService = _AccountService;
        this.router1 = router;
        this.FriendsService = _FriendsService;
        this.SnackBarHelper = _SnackBarHelper;
        route.params.subscribe((params) => {
            this.email = params["email"];
        });
    }
    
    ngOnInit() {
        this.UserService.getUser(this.email)
        .subscribe(result => {
            this.AccountCreated = result.body.accountCreated;
        }, error => {
            console.error(error);
            this.router1.navigateByUrl('app/home');
        });

        document.getElementById('navBar').style.backgroundColor = "rgba(0,0,0,0.4)";

        let currUser: string = localStorage.getItem('email');
        if(currUser === this.email) {
            this.isYourOwn = true;
        }

        this.FriendsService.getFriends(currUser)
        .subscribe(result => {
            let friends: Array<string> = new Array<string>();
            friends = result.body;
            for(let a = 0; a < friends.length; a++) {
                if(friends[a] === this.email) {
                    this.areFriends = true;
                    break;
                }
            }
        }, error => {
            console.error(error);
        });

        let currRole: string = localStorage.getItem('role');
        if(currRole === "Admin") {
            this.currIsAdmin = true;
        }

        this.AccountService.getUserRole(this.email)
        .subscribe(result => {
            let isAdmin: boolean = false;
            for(let a = 0; a < result.length; a++) {
                if(result[a] === 'Admin') {
                    isAdmin = true;
                    break;
                }
            }
            if(isAdmin) {
                this.userIsAdmin = true;
            } else {
                this.userIsAdmin = false;
            }
        }, error => {
            console.error(error);
        });
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

    reportUserPopUp() {
        this.newReport.reported = this.email;
        this.newReport.reporter = localStorage.getItem("email");
        const dialogRef = this.dialog.open(ReportUserComponent, {
            width: '400px',
            data: this.newReport
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result === undefined) { //cancel was clicked
                console.log("User report was cancelled.");
            } else { //create was clicked
                this.report = result;
                this.reportsService.createReport(this.report)
                .subscribe(result => {
                    console.log(result);
                }, error => {
                    console.error(error);
                });
            }
            this.newReport = new ReportUser();
        });
    }

    promote() {
        const dialogRef = this.dialog.open(PromoteDemoteDialogComponent, {
            width: '400px',
            data: "Are you sure you want to promote " + this.email + " to the Admin role?"
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result === 'yes') {
                this.AccountService.promoteToAdmin(this.email)
                .subscribe(result => {
                    this.SnackBarHelper.openSnackBar("The user " + this.email + " has been promoted to the Admin role.", "Dismiss", 4000);
                    this.AccountService.getUserRole(this.email)
                    .subscribe(result => {
                        let isAdmin: boolean = false;
                        for(let a = 0; a < result.length; a++) {
                            if(result[a] === 'Admin') {
                                isAdmin = true;
                                break;
                            }
                        }
                        if(isAdmin) {
                            this.userIsAdmin = true;
                        } else {
                            this.userIsAdmin = false;
                        }
                    }, error => {
                        console.error(error);
                    });
                }, error => {
                    console.error(error);
                });
            }
        });
    }

    demote() {
        const dialogRef = this.dialog.open(PromoteDemoteDialogComponent, {
            width: '400px',
            data: "Are you sure you want to demote " + this.email + " from the Admin role?"
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result === 'yes') {
                this.AccountService.demoteFromAdmin(this.email)
                .subscribe(result => {        
                    this.SnackBarHelper.openSnackBar("The user " + this.email + " has been demoted from the Admin role.", "Dismiss", 4000);
                    this.AccountService.getUserRole(this.email)
                    .subscribe(result => {
                        let isAdmin: boolean = false;
                        for(let a = 0; a < result.length; a++) {
                            if(result[a] === 'Admin') {
                                isAdmin = true;
                                break;
                            }
                        }
                        if(isAdmin) {
                            this.userIsAdmin = true;
                        } else {
                            this.userIsAdmin = false;
                        }
                    }, error => {
                        console.error(error);
                    });
                }, error => {
                    console.error(error);
                });
            }
        });
    }

    unfriend() {
        let request: FriendRequest = new FriendRequest();
        request.sender = this.email;
        request.receiver = localStorage.getItem('email');
        this.FriendsService.unfriend(request)
        .subscribe(result => {
            let currUser: string = localStorage.getItem('email');
            this.FriendsService.getFriends(currUser)
            .subscribe(result => {
                this.areFriends = false;
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
    }
}