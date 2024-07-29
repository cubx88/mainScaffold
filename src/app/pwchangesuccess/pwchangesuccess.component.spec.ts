import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwchangesuccessComponent } from './pwchangesuccess.component';

describe('PwchangesuccessComponent', () => {
  let component: PwchangesuccessComponent;
  let fixture: ComponentFixture<PwchangesuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwchangesuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PwchangesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
