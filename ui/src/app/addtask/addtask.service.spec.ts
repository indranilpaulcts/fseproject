import { TestBed } from '@angular/core/testing';

import { AddtaskService } from './addtask.service';

describe('AddtaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddtaskService = TestBed.get(AddtaskService);
    expect(service).toBeTruthy();
  });
});
