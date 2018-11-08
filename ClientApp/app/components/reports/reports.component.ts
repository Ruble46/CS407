import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportUser } from '../../../Models/ReportUser';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AssignSelfDialogComponent } from '../assignSelfDialog/assignSelfDialog.component';
import { ReportsService } from '../../../Services/ReportsService';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})

export class ReportsComponent implements OnInit{
    private router1: Router;
    private reportsService: ReportsService;
    public choice: string;
    public dialog1: MatDialog;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public reports: Array<ReportUser>;

    expandedReport: ReportUser;
    displayedColumns: string[] = ['Reason', 'Reported', 'Reporter', 'Assigned', 'AssignSelf', "View"];
    dataSource;
    dataSource2;

    constructor(_reportsService: ReportsService, public dialog: MatDialog, router: Router) {
        this.reports = new Array<ReportUser>();
        this.reportsService = _reportsService;
        this.dialog1 = dialog;
        this.router1 = router;
    }

    ngOnInit() {
        if(localStorage.getItem('role') === 'User') {
            this.router1.navigateByUrl('app/home');
        }

        this.reportsService.getAllReports()
        .subscribe(result => {
            this.reports = result.body as Array<ReportUser>;
            this.dataSource = new MatTableDataSource(this.reports);
        }, error => {
            console.error(error);
        });

        if(this.reports.length > 0) {
            this.dataSource.filterPredicate = (data: ReportUser, filter: string) => {
                let allValues: string = Object.keys(data).map(key => {
                    if(data[key] == undefined || data[key] == null) {
                        return '';
                    }
                    return (data[key].toString()).toLowerCase();
                }).join('');
                return allValues.indexOf(filter.toLowerCase()) != -1;
            }
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    assignSelfDialog(ID: string) {
        const dialogRef = this.dialog1.open(AssignSelfDialogComponent, {
            width: '400px',
            data: {post: this.choice}
        });
      
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);

            if(result === 'yes') {
                this.reportsService.assignToReport(localStorage.getItem('email'), ID)
                .subscribe(result => {
                    console.log(result);
                    this.reportsService.getAllReports()
                    .subscribe(result => {
                        this.reports = result.body as Array<ReportUser>;
                        this.dataSource = new MatTableDataSource(this.reports);
                    }, error => {
                        console.error(error);
                    });
                }, error => {
                    console.error(error);
                })
            }
        });
    }
}