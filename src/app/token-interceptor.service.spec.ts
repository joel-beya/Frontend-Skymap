import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './services/token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
