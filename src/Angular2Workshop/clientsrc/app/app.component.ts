import { Component } from '@angular/core';

@Component({
    selector: 'receipt-app',
    templateUrl: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/overview']">Overview</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    styles: [
        require('bootstrap/dist/css/bootstrap')
    ],
})

export class AppComponent {
    pageTitle: string = 'Receipt Management Tool';
}