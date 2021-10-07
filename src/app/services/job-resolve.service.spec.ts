import { TestBed } from '@angular/core/testing';

import { JobResolveService } from './job-resolve.service';

describe('JobResolveService', () => {
  let service: JobResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
