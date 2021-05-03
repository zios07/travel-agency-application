import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBreakBookingComponent } from './city-break-booking.component';

describe('CityBreakBookingComponent', () => {
  let component: CityBreakBookingComponent;
  let fixture: ComponentFixture<CityBreakBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityBreakBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityBreakBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
