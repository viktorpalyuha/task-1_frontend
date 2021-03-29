import { LocalStorageStub } from './../../core/stubs/local-storage.stub';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { MockRouter } from './../../core/mocks/router.mock';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let route;
  let localStorageStub: LocalStorageStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
      ],
      declarations: [FormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(Router);
    localStorageStub = new LocalStorageStub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set properties on register url', () => {
      route.url = '/register';
      const expectedFormData = component.formData;
      expectedFormData.addControl(
        'fullName',
        new FormControl('', Validators.required)
      );
      component.ngOnInit();

      expect(component.registration).toBeTruthy();
      expect(component.formData.value).toEqual(expectedFormData.value);
      expect(component.buttonText).toEqual('Sign up');
      expect(component.formHeader).toEqual('Register');
    });

    it('should set properties on login url', () => {
      route.url = '/login';
      component.ngOnInit();

      expect(component.registration).toBeFalsy();
      expect(component.formData.value).toEqual(component.formData.value);
      expect(component.buttonText).toEqual('Sign in');
      expect(component.formHeader).toEqual('Login');
    });
  });

  describe('validatePassword', () => {
    it('should return { invalidPassword: true } for invalid password}', () => {
      expect(component.validatePassword(new FormControl('123'))).toEqual({
        invalidPassword: true,
      });
    });

    it('should return null for valid password', () => {
      expect(component.validatePassword(new FormControl('12345Rddasdqw'))).toBeNull();
    });
  });
});
