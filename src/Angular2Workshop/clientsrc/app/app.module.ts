import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';

import { ReceiptModule } from './receipt/receipt.module';

import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        ReceiptModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent, WelcomeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }