import { TestBed, inject } from '@angular/core/testing';
import { MeasureRemidateDQService } from './measure-remidate-data-quality.service';

describe('MeasureRemidateDQService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasureRemidateDQService]
    });
  });

  it(
    'should be created',
    inject([MeasureRemidateDQService], (service: MeasureRemidateDQService) => {
      expect(service).toBeTruthy();
    })
  );
});
