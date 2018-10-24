import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportUser } from '../../../Models/ReportUser';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})

export class ReportsComponent implements OnInit{
    private router1: Router;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    expandedReport: ReportUser;
    displayedColumns: string[] = ['Reason', 'Reported', 'Reporter', 'Assigned', 'AssignSelf', "View"];
    dataSource;

    constructor(router: Router) {
        this.router1 = router;
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.REPORTS);
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
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