import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RootModuleShared } from './root.shared.module';
import { RootComponent } from './components/root/root.component';

@NgModule({
    bootstrap: [ RootComponent ],
    imports: [
        ServerModule,
        RootModuleShared
    ]
})
export class AppModule {
}
