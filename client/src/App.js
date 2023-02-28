import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetProducts from "./Components/GetProducts";
import AddProducts from './Components/AddProducts';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import AllProducts from './Components/AllProducts';
import SingleProduct from './Components/SingleProduct';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});


function App() {

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
        <Route path="/myProducts/:id" element={<GetProducts></GetProducts>}></Route>
        <Route path="/addProduct/:id" element={<AddProducts></AddProducts>}></Route>
        <Route path="/allProducts/:id" element={<AllProducts></AllProducts>}></Route>
        <Route path="/product/:id" element={<SingleProduct></SingleProduct>}></Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
