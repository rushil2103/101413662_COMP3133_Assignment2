import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  employeeId!: string;
  employee: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

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
      this.employee = data.getEmployeeById;
    });
  }
}
