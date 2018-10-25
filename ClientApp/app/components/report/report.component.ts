import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportUser } from '../../../Models/ReportUser';
import { MatDialog } from '@angular/material';
import { SendEmailDialogComponent } from '../sendEmailDialog/sendEmailDialog.component';
import { Email } from '../../../Models/Email';
import { DeleteReportDialogComponent } from '../deleteReportDialog/deleteReportDialog.component';
import { ReportsService } from '../../../Services/ReportsService';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})

export class ReportComponent implements OnInit {
    public dialog1: MatDialog;
    private reportsService: ReportsService;
    public newEmail: Email;
    public email: Email;
    private ID: Number;
    public Report: ReportUser;
    public currentUser: string;
    public choice: string;
    public reports: Array<ReportUser>;

    constructor(_reportsService: ReportsService, private route: ActivatedRoute, public dialog: MatDialog) {
        this.reportsService = _reportsService;
        this.dialog1 = dialog;
        route.params.subscribe((params) => {
            this.ID = params["id"];
        });
        this.currentUser = localStorage.getItem('email');
        this.Report = new ReportUser();
        this.newEmail = new Email();

    }

    ngOnInit() {
        this.reportsService.getAllReports()
        .subscribe(result => {
            this.reports = result.body as Array<ReportUser>;

            for(let a = 0; a < result.body.length; a++) {
                if(result.body[a].id === this.ID) {
                    this.Report = result.body[a] as ReportUser;
                    break;
                }
            }
        }, error => {
            console.error(error);
        });
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
}