const { gql } = require('apollo-server-express');

const employeeSchema = gql`
  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  type Query {
    employees: [Employee]
    employee(eid: ID!): Employee
    searchEmployee(designation: String, department: String): [Employee]
  }

  type Mutation {
    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String!,
      gender: String!,
      designation: String!,
      salary: Float!,
      date_of_joining: String!,
      department: String!,
      employee_photo: String
    ): Employee

    updateEmployee(
      eid: ID!,
      first_name: String,
      last_name: String,
      email: String,
      designation: String,
      salary: Float,
      department: String
    ): Employee

    deleteEmployee(eid: ID!): Employee
  }
`;

module.exports = employeeSchema;
