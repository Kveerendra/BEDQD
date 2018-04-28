import { TestBed, inject } from '@angular/core/testing';

import { InternalControlService } from './internal-control.service';

describe('InternalControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalControlService]
    });
  });

  it('should be created', inject([InternalControlService], (service: InternalControlService) => {
    expect(service).toBeTruthy();
  }));
});
