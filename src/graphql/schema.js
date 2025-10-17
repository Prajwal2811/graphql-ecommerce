const { gql } = require('apollo-server');

const typeDefs = gql`
  enum Role {
    ADMIN
    SELLER
    CUSTOMER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    category: String!
    seller: User!
  }

  type Query {
    users: [User!]!
    products(category: String, minPrice: Float, maxPrice: Float): [Product!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: Role): User!
    login(email: String!, password: String!): String! # JWT
    createProduct(name: String!, price: Float!, stock: Int!, category: String!): Product!
  }
`;

module.exports = typeDefs;
