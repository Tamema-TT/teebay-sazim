import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      title
      description
      categories
      isAvailable
      sold
      rented
      rentType
      sellPrice
      rentPrice
      datePosted
      createdBy
    }
  }
`;
export const LOAD_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
      password
      address
      phone
    }
  }
`;