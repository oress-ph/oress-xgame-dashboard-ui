import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPayGenesisComponent } from './send-pay-genesis.component';

describe('SendPayGenesisComponent', () => {
  let component: SendPayGenesisComponent;
  let fixture: ComponentFixture<SendPayGenesisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendPayGenesisComponent]
    });
    fixture = TestBed.createComponent(SendPayGenesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
