import { TestBed } from '@angular/core/testing';

import { CountryServiceService } from './country-service.service';

describe('CountryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryServiceService = TestBed.get(CountryServiceService);
    expect(service).toBeTruthy();
  });
});
