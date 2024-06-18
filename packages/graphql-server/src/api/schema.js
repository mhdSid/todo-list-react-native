const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    dateOfBirth: Date!
    createdAt: Date!
    updatedAt: Date!
    todoItems: [TodoItem!]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type TodoItem {
    id: ID!
    task: String!
    status: String!
    dueDate: Date!
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  type Query {
    me: User
    users: [User!]
    user(id: ID!): User
    todoItems: [TodoItem!]
    todoItem(id: ID!): TodoItem
    todoItemsByStatus(status: String!): [TodoItem!]
    todoItemsByUser(userId: ID!): [TodoItem!]
    todoItemsByTask(task: String!): [TodoItem!]
    todoItemsByDueDate(dueDate: Date!): [TodoItem!]
  }

  type Mutation {
    signUp(firstName: String!, lastName: String!, email: String!, gender: String!, dateOfBirth: Date!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createTodoItem(task: String!, status: String!, dueDate: Date!, userId: ID!): TodoItem!
    updateTodoItem(id: ID!, status: String, task: String, dueDate: Date!): TodoItem!
    deleteTodoItem(id: ID!): Boolean!
  }
`

module.exports = typeDefs
