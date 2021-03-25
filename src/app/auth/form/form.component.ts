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

  constructor(private route: Router) {}

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

  onSubmit(): void {
    if (this.formData.valid) {
      console.log('works');
    } else {
      console.log("doesn't work");
    }
  }
}
