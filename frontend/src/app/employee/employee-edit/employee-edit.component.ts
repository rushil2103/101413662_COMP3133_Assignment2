import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-edit.component.html'
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.fetchEmployee();
  }

  fetchEmployee() {
    const GET_EMPLOYEE = gql`
      query GetEmployee($id: ID!) {
        getEmployeeById(id: $id) {
          name
          email
          department
          position
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEE,
      variables: { id: this.employeeId }
    }).valueChanges.subscribe(({ data }) => {
      this.employeeForm.patchValue(data.getEmployeeById);
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const UPDATE_EMPLOYEE = gql`
        mutation UpdateEmployee($id: ID!, $name: String!, $email: String!, $department: String!, $position: String!) {
          updateEmployee(id: $id, name: $name, email: $email, department: $department, position: $position) {
            _id
          }
        }
      `;

      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.employeeId,
          ...this.employeeForm.value
        }
      }).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
