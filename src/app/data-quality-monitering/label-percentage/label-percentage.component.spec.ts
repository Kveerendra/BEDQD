import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelPercentageComponent } from './label-percentage.component';

describe('LabelPercentageComponent', () => {
  let component: LabelPercentageComponent;
  let fixture: ComponentFixture<LabelPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
