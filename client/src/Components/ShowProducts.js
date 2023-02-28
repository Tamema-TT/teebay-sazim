import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { DELETE_PRODUCT_MUTATION } from "../GraphQL/Mutations";
import { AiFillDelete } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { LOAD_PRODUCTS } from '../GraphQL/Queries';
import { Link } from 'react-router-dom';

const ShowProducts = ({ products, all }) => {
  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    update(cache, { data: { deleteProduct } }) {
      const existingProducts = cache.readQuery({ query: LOAD_PRODUCTS });
      const newProducts = existingProducts.getAllProducts.filter(
        (product) => product.id !== parseInt(deleteProduct.id)
      );
      cache.writeQuery({
        query: LOAD_PRODUCTS,
        data: { getAllProducts: newProducts },
      });
    },
  });

   const deleteThisProduct = async (id) =>  {
    const result = await deleteProduct({
      variables: {
        id: id
      },
      
      refetchQueries: [{query: LOAD_PRODUCTS}],
    });

    if (error) {
      console.log(error);
    }
  };
  return (
    <Grid centered  style={{marginTop: "20px"}}>
      {products.map((val) => (
        <Grid.Row key={`${val.id}`} >
          <Link to={all ? `/product/${val.id}` : ""} style={{ textDecoration: "none", color: "black" }}>
          <Segment padded="very" style={{width: "800px"}}>
            <Grid.Column>
              <Container className='ui red' textAlign='left'>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <h3>{val.title}</h3>
                  {
                    !all && (
                      <button onClick={() => deleteThisProduct(val.id)} className='ui button'> <AiFillDelete/> </button>
                    )
                  }
                </div>
                <p>Categories: {val.categories}</p>
                <p>Price: ${val.sellPrice} | Rent: ${val.rentPrice} {val.rentType} </p>
                <p>{val.description}</p>
                <p>Date Posted: {new Date(val?.datePosted).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}</p>
              </Container>
            </Grid.Column>
          </Segment>
          </Link>
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default ShowProducts;