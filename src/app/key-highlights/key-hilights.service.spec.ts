import { TestBed, inject } from '@angular/core/testing';

import { KeyHilightsService } from './key-hilights.service';

describe('KeyHilightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyHilightsService]
    });
  });

  it('should be created', inject([KeyHilightsService], (service: KeyHilightsService) => {
    expect(service).toBeTruthy();
  }));
});
