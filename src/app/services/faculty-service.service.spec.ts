import { TestBed } from '@angular/core/testing';

import { FacultyServiceService } from './faculty-service.service';

describe('FacultyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacultyServiceService = TestBed.get(FacultyServiceService);
    expect(service).toBeTruthy();
  });
});
