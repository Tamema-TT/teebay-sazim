import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_PRODUCTS } from "../GraphQL/Queries";
import ShowProducts from "./ShowProducts";
import { Container, Grid } from "semantic-ui-react";
import PageHeader from "./PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "./AllButtons";

function GetProducts(props) {
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (data) {
      const tempData = data.getAllProducts.filter(t => t.createdBy === parseInt(id));
      setProducts(tempData);
    }
  }, [data]);

  const handleAddProduct = () => {
    navigate(`/addProduct/${id}`);
  }

  return (
    <div>
      <Grid padded centered width={12}>
        <AllButtons userId={id}></AllButtons>

        <Grid.Row>
          <Grid.Column>
            <PageHeader header="My Products"></PageHeader>
            <ShowProducts
              products={products}
            ></ShowProducts>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <button onClick={handleAddProduct} className='ui blue button' type="submit">Add Product</button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default GetProducts;