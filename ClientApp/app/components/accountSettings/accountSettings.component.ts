import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { AccountService } from '../../../Services/AccountService';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeleteProfileDialogComponent } from '../deleteProfileDialog/deleteProfileDialog.component';

@Component({
    selector: 'accountSettings',
    templateUrl: './accountSettings.component.html',
    styleUrls: ['./accountSettings.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountSettingsComponent implements OnInit {
    private router1: Router;
    public currentPassword: string;
    public newPassword: string;
    private AccountService: AccountService;
    public snackBar: MatSnackBar;
    public dialog1: MatDialog;
    public choice: string;
    public chatBackground: string;
    public chatFontColor: string;

    constructor(public dialog: MatDialog, public _snackBar: MatSnackBar, _AccountService: AccountService, private router: Router, profile: AccountComponent) {
        this.dialog1 = dialog;
        this.snackBar = _snackBar;
        this.AccountService = _AccountService;
        this.router1 = router;
        profile.selected.setValue(3);
    }

    ngOnInit() {
        this.AccountService.getAccount(localStorage.getItem('email'))
        .subscribe(result => {
            this.chatBackground = result.body.backgroundColor;
            this.chatFontColor = result.body.chatColor;
        }, error => {
            console.error(error);
        });
    }

    openSnackBar(message: string, action: string, lengthMs: number) {
        this.snackBar.open(message, action, {
            duration: lengthMs,
        });
    }

    saveSettings() {
        var email: string = localStorage.getItem('email');
        if(this.chatBackground.indexOf('#') != 0 || this.chatFontColor.indexOf('#') != 0) {
            this.openSnackBar('Hex colors must start with a #', 'Close', 3000);
        } else if(this.chatBackground.length != 7 || this.chatFontColor.length != 7) {
            this.openSnackBar('Hex colors must be 7 characters, including the #.', 'Close', 4000);
        } else {
            this.AccountService.accountSettings(email, this.chatBackground, this.chatFontColor)
            .subscribe(result => {
                this.openSnackBar('Save Successful', 'Close', 2500);
            }, error => {
                console.error(error);
                this.openSnackBar('An error has occurred. Please check the console.', 'Close', 3500);
            });
        }
    }

    openDeleteConfirmation() {
        const dialogRef = this.dialog.open(DeleteProfileDialogComponent, {
            width: '400px',
            data: {post: this.choice}
          });
      
          dialogRef.afterClosed().subscribe(result => {
              console.log(result);
            if(result === 'yes') {
                this.AccountService.deleteAccount(localStorage.getItem('email'))
                .subscribe(result => {
                    this.router1.navigateByUrl('');
                }, error => {
                    console.error(error);
                })
            }
        });
    }
}