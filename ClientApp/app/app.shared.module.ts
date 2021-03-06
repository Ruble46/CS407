//Module Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
        MatSortModule, MatTableModule, MatButtonModule, MatToolbarModule, 
        MatIconModule, MatMenuModule, MatListModule, MatSelectModule,
        MatCardModule, MatTabsModule, MatDatepickerModule, MatRadioModule,
        MatNativeDateModule, MatCheckboxModule, MatSidenavModule, 
        MatProgressBarModule, MatDialogModule, MatExpansionModule,
        MatButtonToggleModule, MatBadgeModule, MatSnackBarModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

//Component Imports
import { AccountComponent } from './components/account/account.component';
import { AccountGamingComponent } from './components/accountGaming/accountGaming.component';
import { AccountPostsComponent } from './components/accountPosts/accountPosts.component';
import { AccountRatingComponent } from './components/accountRating/accountRating.component';
import { AccountSettingsComponent } from './components/accountSettings/accountSettings.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationBarComponent } from './components/navigationBar/navigationBar.component';
import { PasswordResetComponent } from './components/passwordReset/passwordReset.component';
import { PasswordResetRequestComponent } from './components/passwordResetRequest/passwordResetRequest.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileChatComponent } from './components/profileChat/profileChat.component';
import { ProfileGamingComponent } from './components/profileGaming/profileGaming.component';
import { ProfilePostsComponent } from './components/profilePosts/profilePosts.component';
import { ProfileRatingComponent } from './components/profileRating/profileRating.component';
import { ReportsComponent} from './components/reports/reports.component';
import { ReportUserComponent } from './components/reportUserDialog/reportUserDialog.component';
import { ReportComponent } from './components/report/report.component';

//Dialog Imports
import { NewPostDialogComponent } from './components/newPostDialog/newPostDialog.component';
import { DeleteProfileDialogComponent } from './components/deleteProfileDialog/deleteProfileDialog.component';
import { SendEmailDialogComponent } from './components/sendEmailDialog/sendEmailDialog.component';
import { DeleteReportDialogComponent } from './components/deleteReportDialog/deleteReportDialog.component';
import { AssignSelfDialogComponent } from './components/assignSelfDialog/assignSelfDialog.component';
import { BanUserDialogComponent } from './components/banUserDialog/banUserDialog.component';
import { AddNewPlatformDialogComponent } from './components/addNewPlatformDialog/addNewPlatformDialog.component';
import { PromoteDemoteDialogComponent } from './components/promoteDemoteDialog/promoteDemoteDialog.component';

//Service and Helper Imports
import { SelfService } from '../Services/SelfService';
import { LoginRegisterService } from '../Services/LoginRegisterService';
import { AccountService } from '../Services/AccountService';
import { UserService } from '../Services/UserService';
import { SnackBarHelper } from '../Helpers/SnackBars';
import { PostService } from '../Services/PostService';
import { ReportsService } from '../Services/ReportsService';
import { HTTPListener, HTTPStatus } from '../Services/HttpInterceptor';
import { RatingService } from '../Services/RatingService';
import { FriendsService } from '../Services/FriendsService';
import { MessagesService } from '../Services/MessagesService';
import { GamingService } from '../Services/GamingService';

//Shared Modules
import { RootModuleShared } from '../root/root.shared.module';
import { IndexSharedModule } from '../index/index.shared.module';

const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
    declarations: [
        //Components go here
        IndexComponent,
        AccountComponent,
        AccountGamingComponent,
        AccountPostsComponent,
        AccountRatingComponent,
        AccountSettingsComponent,
        HomeComponent,
        NavigationBarComponent,
        NewPostDialogComponent,
        PasswordResetComponent,
        PasswordResetRequestComponent,
        PostComponent,
        ProfileComponent,
        ProfileChatComponent,
        ProfileGamingComponent,
        ProfilePostsComponent,
        ProfileRatingComponent,
        DeleteProfileDialogComponent,
        ReportsComponent,
        ReportUserComponent,
        ReportComponent,
        SendEmailDialogComponent,
        DeleteReportDialogComponent,
        AssignSelfDialogComponent,
        BanUserDialogComponent,
        AddNewPlatformDialogComponent,
        PromoteDemoteDialogComponent

    ],
    imports: [
        //Core Modules
        CommonModule,
        HttpModule,
        FormsModule,
        HttpClientModule,
        NoopAnimationsModule,

        //Angular Modules
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule, 
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatRadioModule,
        MatProgressBarModule,
        MatDialogModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatBadgeModule,
        MatSnackBarModule,
        BrowserAnimationsModule,

        //Shared Modules
        RootModuleShared,
        IndexSharedModule,

        //Routes
        RouterModule.forChild([
            // { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: IndexComponent },
            { path: 'passwordReset/:email/:token', component: PasswordResetComponent },
            { path: 'forgotPassword', component: PasswordResetRequestComponent },
            { path: 'app', redirectTo: 'app/home', pathMatch: 'full' },
            { path: 'app', component: NavigationBarComponent, children: [
                { path: 'account', redirectTo: 'account/posts', pathMatch: 'full' },
                { path: 'account', component: AccountComponent, children: [
                    { path: 'settings', component: AccountSettingsComponent },
                    { path: 'gaming', component: AccountGamingComponent },
                    { path: 'posts', component: AccountPostsComponent },
                    { path: 'rating', component: AccountRatingComponent },
                    { path: '**', redirectTo: 'posts' }
                ]},
                { path: 'home', component: HomeComponent },
                { path: 'post', component: PostComponent },
                { path: 'profile/:email', component: ProfileComponent, children: [
                    { path: 'chat', component: ProfileChatComponent },
                    { path: 'gaming', component: ProfileGamingComponent },
                    { path: 'posts', component: ProfilePostsComponent },
                    { path: 'rating', component: ProfileRatingComponent },
                    { path: '**', redirectTo: 'posts' }
                ]},
                { path: 'reports', component: ReportsComponent },
                { path: 'report/:id', component: ReportComponent },
                { path: '**', redirectTo: 'home' }
            ]},
            { path: '**', redirectTo: 'index' }
        ])
    ],
    entryComponents: [
        NewPostDialogComponent, 
        DeleteProfileDialogComponent, 
        ReportUserComponent, 
        SendEmailDialogComponent, 
        DeleteReportDialogComponent, 
        AssignSelfDialogComponent,
        BanUserDialogComponent,
        AddNewPlatformDialogComponent,
        PromoteDemoteDialogComponent
    ],
    providers : [
        SelfService,
        LoginRegisterService,
        AccountService,
        UserService,
        SnackBarHelper,
        PostService,
        ReportsService,
        ...RxJS_Services,
        { provide: HTTP_INTERCEPTORS, useClass: HTTPListener, multi: true },
        RatingService,
        FriendsService,
        MessagesService,
        GamingService
    ]
})
export class AppModuleShared {
}
