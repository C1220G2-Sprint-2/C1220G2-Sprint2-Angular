import { TestBed } from '@angular/core/testing';

import { CheckLoggedInService } from './check-logged-in.service';

describe('CheckLoggedInService', () => {
  let service: CheckLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
