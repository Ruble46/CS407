import { Component, ViewEncapsulation } from '@angular/core';
import { AccountComponent } from '../account/account.component';
import { MatDialog } from '@angular/material';
import { AddNewPlatformDialogComponent } from '../addNewPlatformDialog/addNewPlatformDialog.component';

@Component({
    selector: 'accountGaming',
    templateUrl: './accountGaming.component.html',
    styleUrls: ['./accountGaming.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountGamingComponent {

    public dialog1: MatDialog;
    constructor(profile: AccountComponent, public dialog: MatDialog) {
        profile.selected.setValue(1);
        this.dialog1 = dialog;
    }

    addNewPlatformDialog() {
        const dialogRef = this.dialog.open(AddNewPlatformDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result !== "" && result !== undefined) {
                console.log(result);
            }
        })
    }
}