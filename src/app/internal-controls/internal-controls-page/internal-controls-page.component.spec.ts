import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalControlsPageComponent } from './internal-controls-page.component';

describe('InternalControlsPageComponent', () => {
  let component: InternalControlsPageComponent;
  let fixture: ComponentFixture<InternalControlsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalControlsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalControlsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
