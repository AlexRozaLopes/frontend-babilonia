import { TestBed } from '@angular/core/testing';

import { ModalUpdateSpentService } from './modal-update-spent.service';

describe('ModalUpdateSpentService', () => {
  let service: ModalUpdateSpentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUpdateSpentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
