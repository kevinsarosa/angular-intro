import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopaaComponent } from './shopaa.component';

describe('ShopaaComponent', () => {
  let component: ShopaaComponent;
  let fixture: ComponentFixture<ShopaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopaaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
