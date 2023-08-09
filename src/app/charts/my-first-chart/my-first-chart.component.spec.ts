import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstChartComponent } from './my-first-chart.component';

describe('MyFirstChartComponent', () => {
    let component: MyFirstChartComponent;
    let fixture: ComponentFixture<MyFirstChartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyFirstChartComponent]
        });
        fixture = TestBed.createComponent(MyFirstChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
