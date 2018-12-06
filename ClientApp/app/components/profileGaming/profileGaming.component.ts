import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material';
import { GamingService } from '../../../Services/GamingService';
import { Game } from '../../../Models/Game';
import { UserService } from '../../../Services/UserService';

@Component({
    selector: 'profileGaming',
    templateUrl: './profileGaming.component.html',
    styleUrls: ['./profileGaming.component.css', '../../../themes/theme.css'],
    encapsulation : ViewEncapsulation.Native
})
export class ProfileGamingComponent implements OnInit {
    public dialog1: MatDialog;
    private GamingService: GamingService;
    private p: ProfileComponent;
    user: string;
    public hasSteam: boolean;
    doneLoadingSteam: boolean;
    public games: Array<Game>;
    public steamId: string;
    public steamName: string;
    public steamAvatar: string;
    private UserService: UserService;
    
    constructor(private _UserService: UserService, private _GamingService: GamingService, public dialog: MatDialog, profile: ProfileComponent) {
        profile.selected.setValue(1);
        this.GamingService = _GamingService;
        this.dialog1 = dialog;
        this.p = profile;
        this.hasSteam = false;
        this.doneLoadingSteam = false;
        this.UserService = _UserService;
        this.games = new Array<Game>();
    }

    ngOnInit() {
        this.UserService.getUser(this.p.email)
        .subscribe(result => {
            this.steamId = result.body.steamId;
            this.steamName = result.body.steamName;
            this.steamAvatar = result.body.steamAvatar;

            this.GamingService.getGames(this.p.email)
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
                this.hasSteam = false;
                this.doneLoadingSteam = true;
            });
        }, error => {
            console.error(error);
        });
    }
}