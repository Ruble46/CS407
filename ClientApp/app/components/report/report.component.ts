import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportUser } from '../../../Models/ReportUser';
import { MatDialog } from '@angular/material';
import { SendEmailDialogComponent } from '../sendEmailDialog/sendEmailDialog.component';
import { Email } from '../../../Models/Email';
import { DeleteReportDialogComponent } from '../deleteReportDialog/deleteReportDialog.component';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})

export class ReportComponent implements OnInit {
    public dialog1: MatDialog;
    public newEmail: Email;
    public email: Email;
    private ID: Number;
    public Report: ReportUser;
    public currentUser: string;
    public choice: string;

    constructor(private route: ActivatedRoute, public dialog: MatDialog) {
        this.dialog1 = dialog;
        route.params.subscribe((params) => {
            this.ID = params["id"];
        });
        this.currentUser = localStorage.getItem('email');
        this.newEmail = new Email();
    }

    ngOnInit() {
        for(let a = 0; a < this.REPORTS.length; a++) {
            if(this.REPORTS[a].ID.toString() === this.ID.toString()) {
                this.Report = this.REPORTS[a];
                break;
            }
        }
        console.log(this.Report);
    }

    newEmailDialog(to: string) {
        this.newEmail.To = to;
        this.newEmail.From = localStorage.getItem('email');
        const dialogRef = this.dialog.open(SendEmailDialogComponent, {
            width: '400px',
            data: this.newEmail
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if(result === undefined) { //cancel was clicked
                console.log("User report was cancelled.");
            } else { //create was clicked
                this.email = result;
                console.log(this.email);
            }
            this.newEmail = new Email();
        });
    }

    closeTicketDialog() {
        const dialogRef = this.dialog.open(DeleteReportDialogComponent, {
            width: '400px',
            data: {post: this.choice}
          });
      
          dialogRef.afterClosed().subscribe(result => {
              console.log(result);
        });
    }

    REPORTS: Array<ReportUser> = [
        {ID: 1, Reason: 'Bill is being a dick and wont stop messaging me', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: 'ruble46@hotmail.com'},
        {ID: 2, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
        {ID: 3, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
        {ID: 4, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: 'adming@game2gether.com'},
        {ID: 5, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
        {ID: 6, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
        {ID: 7, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
        {ID: 8, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
        {ID: 9, Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'b.omalley95@yahoo.com', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    ];
}