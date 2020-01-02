import { Component } from '@angular/core';

@Component({
    selector: 'pm-root',
    templateUrl: './app.component.html',
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    pageTitle: string = 'Movies Application';
    public isNavbarCollapsed: boolean = true;

    public menu = {
        items: [
            {
                title: "Welcome",
                link: "/welcome"
            },
            {
                title: "Movies List",
                link: "/movies-list"
            }
        ]
    };
}
