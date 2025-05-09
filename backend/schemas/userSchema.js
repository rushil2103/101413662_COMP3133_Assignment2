const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    login(username: String, email: String, password: String!): AuthPayload
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
  }
`;

module.exports = userSchema;
