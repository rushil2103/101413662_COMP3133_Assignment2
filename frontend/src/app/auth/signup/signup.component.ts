import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      console.log('Signup input:', { name, email, password });

      this.auth.signup(email, password, name).subscribe({
        next: (success) => {
          if (success) {
            console.log('Signup successful. Redirecting...');
            this.router.navigate(['/login']);
          } else {
            alert('Signup failed. Please try again.');
          }
        },
        error: (err) => {
          console.error('Signup error:', err);
          alert('An error occurred during signup.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
