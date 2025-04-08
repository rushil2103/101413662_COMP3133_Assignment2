import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-add.component.html'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const ADD_EMPLOYEE = gql`
        mutation AddEmployee($name: String!, $email: String!, $department: String!, $position: String!) {
          addEmployee(name: $name, email: $email, department: $department, position: $position) {
            _id
            name
          }
        }
      `;

      const formValues = this.employeeForm.value;

      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: formValues
      }).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
