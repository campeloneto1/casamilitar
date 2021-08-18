import { TestBed } from '@angular/core/testing';

import { PostogradService } from './postograd.service';

describe('PostogradService', () => {
  let service: PostogradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostogradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
