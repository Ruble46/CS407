import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportUser } from '../../../Models/ReportUser';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.None
})

export class ReportsComponent implements OnInit{
    private router1: Router;

    expandedReport: ReportUser;
    displayedColumns: string[] = ['Reason', 'Reported', 'Reporter', 'Assigned', 'Button'];
    dataSource = REPORTS;

    constructor(router: Router) {
        this.router1 = router;
    }

    ngOnInit() {
        
    }
}

const REPORTS: ReportUser[] = [
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: 'adming@game2gether.com'},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
    {Reason: 'Bill is being a dick', Description: 'He wont stop being a bully to me, check the chat messages between us', Reported: 'womalley@purdue.edu', Reporter: 'ruble46@hotmail.com', Assigned: ''},
  ];