import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AccountComponent } from '../account/account.component';
import { MatDialog } from '@angular/material';
import { AddNewPlatformDialogComponent } from '../addNewPlatformDialog/addNewPlatformDialog.component';
import { GamingService } from '../../../Services/GamingService';
import { Game } from '../../../Models/Game';
import { AccountService } from '../../../Services/AccountService';
import { SnackBarHelper } from '../../../Helpers/SnackBars';


@Component({
    selector: 'accountGaming',
    templateUrl: './accountGaming.component.html',
    styleUrls: ['./accountGaming.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class AccountGamingComponent implements OnInit {
    public dialog1: MatDialog;
    private GamingService: GamingService;
    private AccountService: AccountService;
    currUser: string;
    public hasSteam: boolean;
    doneLoadingSteam: boolean;
    public games: Array<Game>;
    public steamId: string;
    public steamName: string;
    public steamAvatar: string;
    public SnackBarHelper: SnackBarHelper;

    constructor(private _SnackBarHelper: SnackBarHelper, private _AccountService: AccountService, private _GamingService: GamingService, account: AccountComponent, public dialog: MatDialog) {
        account.selected.setValue(1);
        this.dialog1 = dialog;
        this.GamingService = _GamingService;
        this.AccountService = _AccountService;
        this.currUser = localStorage.getItem('email');
        this.hasSteam = false;
        this.doneLoadingSteam = false;
        this.games = new Array<Game>();
        this.SnackBarHelper = _SnackBarHelper;
    }
    
    ngOnInit() {
        this.GamingService.getGames(this.currUser)
        .subscribe(result => {
            this.games = result;
            this.steamId = localStorage.getItem("steamId");
            this.steamName = localStorage.getItem("steamName");
            this.steamAvatar = localStorage.getItem("steamAvatar");
            if(this.steamName !== "" && this.steamName !== null && this.steamName != undefined) {
                this.hasSteam = true;
            }
            this.doneLoadingSteam = true;
        }, error => {
            console.error(error);
        });
    }

    addNewPlatformDialog() {
        const dialogRef = this.dialog.open(AddNewPlatformDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result !== "" && result !== undefined) {
                console.log(result);
                this.hasSteam = false;
                this.doneLoadingSteam = false;
                this.GamingService.setSteamId(this.currUser, result)
                .subscribe(res => {
                    this.SnackBarHelper.openSnackBar('Your steam account has been successfully synced. Requesting your steam library now.', 'Dismiss', 6000);
                    let email: string = localStorage.getItem('email');
                    this.AccountService.getAccount(email)
                    .subscribe(result => {
                        localStorage.setItem('steamId', result.body.steamId);
                        localStorage.setItem('steamName', result.body.steamName);
                        localStorage.setItem('steamAvatar', result.body.steamAvatar);

                        this.GamingService.getGames(this.currUser)
                        .subscribe(result => {
                            this.games = result;
                            this.steamId = localStorage.getItem("steamId");
                            this.steamName = localStorage.getItem("steamName");
                            this.steamAvatar = localStorage.getItem("steamAvatar");
                            if(this.steamName !== "" && this.steamName !== null && this.steamName != undefined) {
                                this.hasSteam = true;
                            }
                            this.doneLoadingSteam = true;
                        }, error => {
                            console.error(error);
                        });
                    }, error => {
                        console.error(error);
                    });
                }, error => {
                    console.error(error);
                });
            }
        })
    }
}