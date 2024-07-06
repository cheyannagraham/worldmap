import { TestBed } from '@angular/core/testing';

import { CountryDataAPIService } from './country-data-api.service';

describe('CountryDataAPIService', () => {
  let service: CountryDataAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDataAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
