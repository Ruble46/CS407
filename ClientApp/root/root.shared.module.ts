import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            // { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: '', redirectTo: 'index', pathMatch: 'full' },
        ])
    ]
})
export class RootModuleShared {
}
