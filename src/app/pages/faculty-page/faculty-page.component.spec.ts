import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyPageComponent} from './faculty-page.component';

describe('FacultyPageComponent', () => {
  let component: FacultyPageComponent;
  let fixture: ComponentFixture<FacultyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyPageComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
