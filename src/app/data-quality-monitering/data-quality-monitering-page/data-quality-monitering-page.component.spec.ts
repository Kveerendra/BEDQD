import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQualityMoniteringPageComponent } from './data-quality-monitering-page.component';

describe('DataQualityMoniteringPageComponent', () => {
  let component: DataQualityMoniteringPageComponent;
  let fixture: ComponentFixture<DataQualityMoniteringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataQualityMoniteringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataQualityMoniteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
