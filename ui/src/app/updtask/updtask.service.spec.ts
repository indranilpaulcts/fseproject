import { TestBed } from '@angular/core/testing';

import { UpdtaskService } from './updtask.service';

describe('UpdtaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdtaskService = TestBed.get(UpdtaskService);
    expect(service).toBeTruthy();
  });
});
