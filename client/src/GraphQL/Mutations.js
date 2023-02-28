import { gql } from "@apollo/client";

export const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct(
    $title: String!
    $categories: String!
    $isAvailable: Boolean!
    $sold: Boolean!
    $rented: Boolean!
    $description: String!
    $rentType: String!
    $sellPrice: Int!
    $rentPrice: Int!
    $datePosted: String!
    $createdBy: Int!
  ) {
    addProduct(
        title: $title
        categories: $categories
        isAvailable: $isAvailable
        sold: $sold
        rented: $rented
        description: $description
        rentType: $rentType
        sellPrice: $sellPrice
        rentPrice: $rentPrice
        datePosted: $datePosted
        createdBy: $createdBy
    ) {
      id
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
mutation deleteProduct(
    $id: ID!
  ) {
    deleteProduct(
      id: $id
    ) {
      id
    }
  }
`;