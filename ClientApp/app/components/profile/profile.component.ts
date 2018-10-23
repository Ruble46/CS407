import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../Services/UserService';
import { ReportUser } from '../../../Models/ReportUser';
import { ReportUserComponent } from '../reportUserDialog/reportUserDialog.component';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../themes/theme.css', './profile.component.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileComponent implements OnInit {
    public email: string;
    public AccountCreated: Date;
    private router1: Router;
    public selected = new FormControl(0);
    private UserService: UserService;
    public dialog1: MatDialog;
    public newReport: ReportUser;
    public report: ReportUser;

    constructor(public dialog: MatDialog, _UserService: UserService, private route: ActivatedRoute, private router: Router) {
        this.dialog1 = dialog;
        this.newReport = new ReportUser();
        this.UserService = _UserService;
        this.router1 = router;
        route.params.subscribe((params) => {
            this.email = params["email"];
        });
    }
    
    ngOnInit() {
        this.UserService.getUser(this.email)
        .subscribe(result => {
            console.log(result);
            this.AccountCreated = result.body.accountCreated;
        }, error => {
            console.error(error);
            this.router1.navigateByUrl('app/home');
        });
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

    reportUserPopUp() {
        this.newReport.Reported = this.email;
        this.newReport.Reporter = localStorage.getItem("email");
        const dialogRef = this.dialog.open(ReportUserComponent, {
            width: '400px',
            data: this.newReport
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result === undefined) { //cancel was clicked
                console.log("User report was cancelled.");
            } else { //create was clicked
                this.report = result;
                console.log(this.report);
            }
            this.newReport = new ReportUser();
        });
    }
}