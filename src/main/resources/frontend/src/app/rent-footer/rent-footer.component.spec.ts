import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentFooterComponent } from './rent-footer.component';

describe('RentFooterComponent', () => {
  let component: RentFooterComponent;
  let fixture: ComponentFixture<RentFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
