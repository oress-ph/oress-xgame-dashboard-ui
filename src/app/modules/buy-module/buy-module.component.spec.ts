import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyModuleComponent } from './buy-module.component';

describe('BuyModuleComponent', () => {
  let component: BuyModuleComponent;
  let fixture: ComponentFixture<BuyModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyModuleComponent]
    });
    fixture = TestBed.createComponent(BuyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
