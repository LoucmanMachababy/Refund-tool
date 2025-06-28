import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementForm } from './reimbursement-form';

describe('ReimbursementForm', () => {
  let component: ReimbursementForm;
  let fixture: ComponentFixture<ReimbursementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursementForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimbursementForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
