//Module Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
        MatSortModule, MatTableModule, MatButtonModule, MatToolbarModule, 
        MatIconModule, MatMenuModule, MatListModule, MatSelectModule,
        MatCardModule, MatTabsModule, MatDatepickerModule, MatRadioModule,
        MatNativeDateModule, MatCheckboxModule, MatSidenavModule, 
        MatProgressBarModule} from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

//Component Imports
import { AccountComponent } from './components/account/account.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationBarComponent } from './components/navigationBar/navigationBar.component';
import { PasswordResetComponent } from './components/passwordReset/passwordReset.component';
import { PasswordResetRequestComponent } from './components/passwordResetRequest/passwordResetRequest.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';

//Service and Helper Imports


//Shared Modules
import { RootModuleShared } from '../root/root.shared.module';
import { IndexSharedModule } from '../index/index.shared.module';

@NgModule({
    declarations: [
        //Components go here
        IndexComponent,
        AccountComponent,
        HomeComponent,
        NavigationBarComponent,
        PasswordResetComponent,
        PasswordResetRequestComponent,
        PostComponent,
        ProfileComponent
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

        //Shared Modules
        RootModuleShared,
        IndexSharedModule,

        //Routes
        RouterModule.forChild([
            // { path: '', redirectTo: 'index', pathMatch: 'full' },
            // { path: 'index', component: IndexComponent },
            // { path: '**', redirectTo: 'index' },
            { path: 'passwordReset', component: PasswordResetComponent },
            { path: 'forgotPassword', component: PasswordResetRequestComponent },
            { path: 'app', component: NavigationBarComponent, children: [
                { path: 'account', component: AccountComponent },
                { path: 'home', component: HomeComponent },
                { path: 'post', component: PostComponent },
                { path: 'profile', component: ProfileComponent }
            ]}
        ])
    ], providers : [
        
    ]
})
export class AppModuleShared {
}
