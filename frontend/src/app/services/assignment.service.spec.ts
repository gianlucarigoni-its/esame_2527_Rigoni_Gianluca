import { TestBed } from '@angular/core/testing';
import { AssignemtService } from './assignemt.service';

describe('AssignemtService', () => {
  let service: AssignemtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignemtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
