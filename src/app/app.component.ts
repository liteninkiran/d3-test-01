import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public covid$: Observable<any>;

    constructor(private api: ApiService) {}

    public ngOnInit(): void {
        this.covid$ = this.api.getCovidData();
    }

    public ngOnDestroy(): void {
    }
}
