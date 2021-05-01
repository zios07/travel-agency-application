import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBreakEditorComponent } from './city-break-editor.component';

describe('CityBreakEditorComponent', () => {
  let component: CityBreakEditorComponent;
  let fixture: ComponentFixture<CityBreakEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityBreakEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityBreakEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
