const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    name: String
    description: String
    completed: Boolean
    dependencies: [Task]
    owner: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    tasks: [Task]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addTask(name: String!, description: String, dependencies: [String]): Task

  }
`;

module.exports = typeDefs;
