import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IndexSharedModule } from './index.shared.module';
import { IndexComponent } from '../app/components/index/index.component';

@NgModule({
    bootstrap: [ IndexComponent ],
    imports: [
        BrowserModule,
        IndexSharedModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
