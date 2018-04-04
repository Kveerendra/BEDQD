import { TestBed, inject } from '@angular/core/testing';

import { DataQualityMoniteringService } from './data-quality-monitering.service';

describe('DataQualityMoniteringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataQualityMoniteringService]
    });
  });

  it('should be created', inject([DataQualityMoniteringService], (service: DataQualityMoniteringService) => {
    expect(service).toBeTruthy();
  }));
});
