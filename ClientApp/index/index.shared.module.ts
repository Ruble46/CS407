import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatToolbarModule, MatIconModule} from "@angular/material";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IndexComponent } from '../app/components/index/index.component';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatProgressBarModule,
        RouterModule.forChild([
            { path: 'index', component: IndexComponent },
        ])
    ],
    providers: [
    ]
})
export class IndexSharedModule {
}
