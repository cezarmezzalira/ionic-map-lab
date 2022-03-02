import { TestBed } from '@angular/core/testing';

import { OpenStreetMapsProviderService } from './open-street-maps-provider.service';

describe('OpenStreetMapsProviderService', () => {
  let service: OpenStreetMapsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenStreetMapsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
