import { TestBed } from '@angular/core/testing';

import { GoogleMapsJSProvider } from './google-maps-js.provider';

describe('GoogleMapsJSProvider', () => {
  let service: GoogleMapsJSProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsJSProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
