import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateSpentComponent } from './modal-update-spent.component';

describe('ModalUpdateSpentComponent', () => {
  let component: ModalUpdateSpentComponent;
  let fixture: ComponentFixture<ModalUpdateSpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateSpentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
