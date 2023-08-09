import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySecondChartComponent } from './my-second-chart.component';

describe('MySecondChartComponent', () => {
    let component: MySecondChartComponent;
    let fixture: ComponentFixture<MySecondChartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MySecondChartComponent]
        });
        fixture = TestBed.createComponent(MySecondChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
