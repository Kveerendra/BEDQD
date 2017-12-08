import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyHighlightsPageComponent } from './key-highlights-page.component';

describe('KeyHighlightsPageComponent', () => {
  let component: KeyHighlightsPageComponent;
  let fixture: ComponentFixture<KeyHighlightsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyHighlightsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyHighlightsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
