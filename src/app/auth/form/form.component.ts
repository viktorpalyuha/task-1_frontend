import { Token } from './../../shared/models/auth/token.interface';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.validatePassword.bind(this),
    ]),
  });
  registration = false;
  formHeader: string;
  buttonText: string;

  constructor(private route: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.route.url === '/register') {
      this.registration = true;
      this.formData.addControl(
        'fullName',
        new FormControl('', Validators.required)
      );
      this.formHeader = 'Register';
      this.buttonText = 'Sign up';
    } else {
      this.formHeader = 'Login';
      this.registration = false;
      this.buttonText = 'Sign in';
    }
  }

  validatePassword(control: FormControl): { [s: string]: boolean } {
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!validPassword.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  onSubmit() {
    if (this.formData.valid && this.buttonText === 'Sign in') {
      this.authService
        .login(
          this.formData.get('email').value,
          this.formData.get('password').value
        )
        .subscribe((response: Token) => {
          this.authService.setToken(response);
          this.route.navigate(['games']);
        });
    } else if (this.formData.valid && this.buttonText === 'Sign up') {
      this.authService.register(this.formData.value).subscribe((_) => {
        this.route.navigate(['login']);
      });
    }
  }

  onFacebookLogin() {
    this.authService.fbLogin().then((jwt: Token) => {
      this.authService.setToken(jwt);
      this.route.navigate(['games']);
    });
  }
}
