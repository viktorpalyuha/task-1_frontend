import { Token } from './../shared/models/auth/token.interface';
import { LocalStorageStub } from './../core/stubs/local-storage.stub';
import { CustomerMock } from './../core/mocks/customer.mock';
import { JwtMock } from './../core/mocks/token.mock';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockedToken: Token;
  let localStorageStub: LocalStorageStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    mockedToken = { ...new JwtMock() };
    localStorageStub = new LocalStorageStub();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return Observable<token>', () => {
      const mockedToken = new JwtMock();

      service.login('johnk@gmail.com', '1V1234567asd').subscribe((token) => {
        expect(token).toEqual(mockedToken);
      });

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockedToken);
    });
  });

  describe('register', () => {
    it('should return Observable<Customer>', () => {
      const mockedCustomer = new CustomerMock();

      service.register(mockedCustomer).subscribe((customer) => {
        expect(customer).toEqual(mockedCustomer);
      });

      const req = httpMock.expectOne('/api/auth/register');
      expect(req.request.method).toBe('POST');
      req.flush(mockedCustomer);
    });
  });

  describe('setToken', () => {
    it('should set token', () => {
      spyOn(localStorage, 'setItem').and.callFake(
        localStorageStub.mockLocalStorage.setItem
      );

      service.setToken(mockedToken);

      expect(localStorageStub.store).toEqual(mockedToken);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true', () => {
      spyOn(localStorage, 'setItem').and.callFake(
        localStorageStub.mockLocalStorage.setItem
      );
      spyOn(localStorage, 'getItem').and.callFake(
        localStorageStub.mockLocalStorage.getItem
      );

      service.setToken(mockedToken);

      expect(service.isAuthenticated()).toBeTruthy();
    });

    it('should return false', () => {
      spyOn(localStorage, 'getItem').and.callFake(
        localStorageStub.mockLocalStorage.getItem
      );

      expect(service.isAuthenticated()).toBeFalsy();
    });
  });
});
