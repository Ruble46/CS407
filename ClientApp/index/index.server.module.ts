import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { IndexSharedModule } from './index.shared.module';
import { IndexComponent } from '../app/components/index/index.component';

@NgModule({
    bootstrap: [ IndexComponent ],
    imports: [
        ServerModule,
        IndexSharedModule
    ]
})
export class AppModule {
}
