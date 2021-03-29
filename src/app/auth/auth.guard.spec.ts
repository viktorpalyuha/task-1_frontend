import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockRouter } from './../core/mocks/router.mock';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        { provide: Router, useClass: MockRouter },
      ],
      imports: [HttpClientTestingModule],
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('canActivate should return true for a logged in user', () => {
    authService = { isAuthenticated: () => true };
    router = new MockRouter();
    authGuard = new AuthGuard(authService, router);

    expect(authGuard.canActivate()).toEqual(true);
  });

  it('canActivate should navigate to login for a logged out users', () => {
    authService = { isAuthenticated: () => false };
    router = new MockRouter();
    authGuard = new AuthGuard(authService, router);
    spyOn(router, 'navigate');

    expect(authGuard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
