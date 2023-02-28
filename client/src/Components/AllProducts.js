import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { LOAD_PRODUCTS } from '../GraphQL/Queries';
import AllButtons from './AllButtons';
import PageHeader from './PageHeader';
import ShowProducts from './ShowProducts';

const AllProducts = () => {
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (data) {
      setProducts(data.getAllProducts);
    }
  }, [data]);

  return (
    <Grid padded centered width={12}>
      <AllButtons userId={id}></AllButtons>
      <Grid.Row>
          <Grid.Column>
            <PageHeader header="All Products"></PageHeader>
            <ShowProducts
              products={products}
              all={true}
            ></ShowProducts>
          </Grid.Column>
        </Grid.Row>
    </Grid>
  );
};

export default AllProducts;