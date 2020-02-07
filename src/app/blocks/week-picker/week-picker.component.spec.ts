import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WeekPickerComponent} from './week-picker.component';

describe('WeekPickerComponent', () => {
    let component: WeekPickerComponent;
    let fixture: ComponentFixture<WeekPickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WeekPickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WeekPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
