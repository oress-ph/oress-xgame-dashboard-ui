import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOrPayGenesisComponent } from './send-or-pay-genesis.component';

describe('SendOrPayGenesisComponent', () => {
  let component: SendOrPayGenesisComponent;
  let fixture: ComponentFixture<SendOrPayGenesisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendOrPayGenesisComponent]
    });
    fixture = TestBed.createComponent(SendOrPayGenesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
