import { TestBed } from '@angular/core/testing';

import { UserLogedService } from './user-loged.service';

describe('UserLogedService', () => {
  let service: UserLogedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
