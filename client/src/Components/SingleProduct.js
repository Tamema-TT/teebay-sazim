import React, { useEffect, useState } from "react";
import { Container, Grid, Segment } from 'semantic-ui-react';
import { useQuery, gql } from "@apollo/client";
import { LOAD_PRODUCTS } from "../GraphQL/Queries";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "./AllButtons";
import ConfirmationModal from "./ConfirmationModal";

const SingleProduct = () => {
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const tempData = data.getAllProducts.filter(t => t.id === parseInt(id));
      setProduct(tempData[0]);
    }
  }, [data]);
  
  return (
    <Grid centered style={{marginTop: "20px"}}>
      <AllButtons></AllButtons>
      <Grid.Row style={{marginTop: "20px"}} key={product.id}>
        <Container padded="very" style={{width: "800px"}}>
          <Grid.Column>
            <Container className='ui red' textAlign='left'>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>{product.title}</h3>
              </div>
              <p>Categories: {product.categories}</p>
              <p>Price: ${product.sellPrice} | Rent: ${product.rentPrice} {product.rentType} </p>
              <p>{product.description}</p>
            </Container>
          </Grid.Column>
        </Container>
      </Grid.Row>

      <div style={{display: "flex"}}>
        <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <button className='ui blue button' type="submit">Rent</button>
          </Grid.Column>
        </Grid.Row>
        <ConfirmationModal></ConfirmationModal>
      </div>
    </Grid>
  );
};

export default SingleProduct;