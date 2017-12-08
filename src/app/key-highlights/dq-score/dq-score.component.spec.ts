import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqScoreComponent } from './dq-score.component';

describe('DqScoreComponent', () => {
  let component: DqScoreComponent;
  let fixture: ComponentFixture<DqScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
