import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'zendesk-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email') as AbstractControl;
  }

  get password() {
    return this.form.get('password') as AbstractControl;
  }

  signIn() {
    this.auth.signIn(this.email.value, this.password.value).subscribe();
  }
}
