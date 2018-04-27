import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureRemidateDataQualityComponent } from './measure-remidate-data-quality.component';

describe('MeasureRemidateDataQualityComponent', () => {
  let component: MeasureRemidateDataQualityComponent;
  let fixture: ComponentFixture<MeasureRemidateDataQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureRemidateDataQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureRemidateDataQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
