const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    dateOfBirth: Date!
    createdAt: Date!
    updatedAt: Date!
    todoItems: [TodoItem!]
    verificationCode: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  
  type RecommendationItem {
    recommendedTasks: [String]
  }

  type TodoItem {
    id: ID
    task: String!
    status: String!
    dueDate: Date!
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  type TodoItemWithRecommendations {
    todoItem: TodoItem
    recommendations: [TodoItem]
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
    todoItemWithRecommendation(id: ID!): TodoItemWithRecommendations
  }

  type Mutation {
    signUp(firstName: String!, lastName: String!, email: String!, gender: String!, dateOfBirth: Date!, password: String!): User!
    login(email: String!, password: String!): User!
    verifyEmail(email: String!, verificationCode: String!): AuthPayload
    createTodoItem(task: String!, status: String!, dueDate: Date!, userId: ID!): TodoItem!
    updateTodoItem(id: ID!, status: String, task: String, dueDate: Date!): TodoItem!
    deleteTodoItem(id: ID!): Boolean!
  }
`

module.exports = typeDefs
