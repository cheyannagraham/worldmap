import { TestBed } from '@angular/core/testing';

import { CountryAPIService } from './countryapi.service';

describe('CountryAPIService', () => {
  let service: CountryAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
