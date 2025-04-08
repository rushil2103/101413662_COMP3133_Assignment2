import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const GET_EMPLOYEES = gql`
      query GetEmployees {
        getEmployees {
          _id
          name
          email
          department
          position
        }
      }
    `;

    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe(({ data }) => {
      this.employees = data.getEmployees;
    });
  }

  deleteEmployee(id: string) {
    const DELETE_EMPLOYEE = gql`
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id) {
          _id
        }
      }
    `;

    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    }).subscribe(() => {
      this.employees = this.employees.filter(emp => emp._id !== id);
    });
  }
}
