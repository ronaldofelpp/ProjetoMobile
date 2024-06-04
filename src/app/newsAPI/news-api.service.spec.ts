import { TestBed } from '@angular/core/testing';

import { NewsAPIService } from './news-api.service';

describe('NewsAPIService', () => {
  let service: NewsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
