import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicTopbarComponent} from './basic-topbar.component';

describe('BasicTopbarComponent', () => {
    let component: BasicTopbarComponent;
    let fixture: ComponentFixture<BasicTopbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BasicTopbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicTopbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
