import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootModuleShared } from './root.shared.module';
import { RootComponent } from './components/root/root.component';

@NgModule({
    bootstrap: [ RootComponent ],
    imports: [
        BrowserModule,
        RootModuleShared
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
