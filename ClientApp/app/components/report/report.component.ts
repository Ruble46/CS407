import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportUser } from '../../../Models/ReportUser';
import { MatDialog } from '@angular/material';
import { SendEmailDialogComponent } from '../sendEmailDialog/sendEmailDialog.component';
import { Email } from '../../../Models/Email';
import { DeleteReportDialogComponent } from '../deleteReportDialog/deleteReportDialog.component';
import { ReportsService } from '../../../Services/ReportsService';
import { SnackBarHelper } from '../../../Helpers/SnackBars';
import { BanUserDialogComponent } from '../banUserDialog/banUserDialog.component';
import { AccountService } from '../../../Services/AccountService';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})

export class ReportComponent implements OnInit {
    public dialog1: MatDialog;
    private reportsService: ReportsService;
    private AccountService: AccountService;
    public newEmail: Email;
    public email: Email;
    private ID: string;
    public Report: ReportUser;
    public currentUser: string;
    public choice: string;
    public reports: Array<ReportUser>;
    private router: Router;
    private snackBar: SnackBarHelper;

    constructor(private _AccountService: AccountService, private _snackBar: SnackBarHelper, private _router: Router, _reportsService: ReportsService, private route: ActivatedRoute, public dialog: MatDialog) {
        this.reportsService = _reportsService;
        this.AccountService = _AccountService;
        this.dialog1 = dialog;
        this.router = _router;
        this.snackBar = _snackBar;
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
        this.newEmail.From = 'support@game2gether.com';
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

                this.reportsService.sendEmail(this.email, this.ID)
                .subscribe(result => {
                    this.snackBar.openSnackBar('Email has been sent successfully.', 'Close', 3000);
                }, error => {
                    console.error(error);
                })
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
            if(result === 'yes') {
                this.reportsService.closeTicket(this.ID)
                .subscribe(result => {
                    this.router.navigateByUrl('app/reports');
                    this.choice = 'false';
                }, error => {
                    this.choice = 'false';
                    console.error(error);
                })
              }
        });

    }

    banUserDialog() {
        const dialogRef = this.dialog.open(BanUserDialogComponent, {
            width: '400px',
            data: {post: this.choice}
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result === 'yes') {
                this.AccountService.banUser(this.Report.reported)
                .subscribe(result => {
                    console.log(result);
                }, error => {
                    console.error(error);
                });
            }
        })
    }
}