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
        MatButtonToggleModule, MatBadgeModule} from "@angular/material";
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
import { NewPostDialogComponent } from './components/newPostDialog/newPostDialog.component';
import { PasswordResetComponent } from './components/passwordReset/passwordReset.component';
import { PasswordResetRequestComponent } from './components/passwordResetRequest/passwordResetRequest.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileChatComponent } from './components/profileChat/profileChat.component';
import { ProfileGamingComponent } from './components/profileGaming/profileGaming.component';
import { ProfilePostsComponent } from './components/profilePosts/profilePosts.component';
import { ProfileRatingComponent } from './components/profileRating/profileRating.component';

//Service and Helper Imports
import { SelfService } from '../Services/SelfService';
import { LoginRegisterService } from '../Services/LoginRegisterService';

//Shared Modules
import { RootModuleShared } from '../root/root.shared.module';
import { IndexSharedModule } from '../index/index.shared.module';

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
        ProfileRatingComponent
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

        //Shared Modules
        RootModuleShared,
        IndexSharedModule,

        //Routes
        RouterModule.forChild([
            // { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: IndexComponent },
            { path: 'passwordReset', component: PasswordResetComponent },
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
                { path: '**', redirectTo: 'home' }
            ]},
            { path: '**', redirectTo: 'index' }
        ])
    ],
    entryComponents: [NewPostDialogComponent],
    providers : [
        SelfService,
        LoginRegisterService
    ]
})
export class AppModuleShared {
}
