import React, { useState } from "react";
import { ADD_PRODUCT_MUTATION } from "../GraphQL/Mutations";
import { LOAD_PRODUCTS } from "../GraphQL/Queries";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Container, Form, Grid, Segment } from 'semantic-ui-react'
import { Link, useNavigate, useParams } from "react-router-dom";

const AddProducts = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addProduct, { error }] = useMutation(ADD_PRODUCT_MUTATION, {
    onCompleted(data) {
      console.log("Data passed in the mutation:", data);
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const addNewProduct = async (data) =>  {
    const result = await addProduct({
      variables: {
        title: data?.title,
        categories: data?.categories,
        isAvailable: true,
        sold: false,
        rented: false,
        description: data?.description,
        rentType: data?.rentType,
        sellPrice: parseInt(data?.sellPrice) ,
        rentPrice: parseInt(data?.rentPrice),
        datePosted: new Date(),
        createdBy: parseInt(id)
      },
      refetchQueries: [{query: LOAD_PRODUCTS}],
    });

    console.log("result", result);
    navigate(`/myProducts/${id}`);

    if (error) {
      console.log(error);
    }
  };

  const productOption = [
    { key: 'a', text: 'Electronics', value: 'Electronics' },
    { key: 'b', text: 'Furniture', value: 'Furniture' },
    { key: 'c', text: 'Home Appliances', value: 'Home Appliances' },
  ]

  const rentOption = [
    { key: 'a', text: 'Hourly', value: 'hourly' },
    { key: 'b', text: 'Daily', value: 'daily' },
    { key: 'c', text: 'Monthly', value: 'monthly' },
    { key: 'd', text: 'Yearly', value: 'yearly' },
  ]

  return (
    <Grid padded width={12} >
      <Grid.Row style={{ margin: "50px" }}>
        <Form onSubmit={handleSubmit(addNewProduct)}>

          <Form.Field>
            <label>Title</label>
            <input type="text" {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
          </Form.Field>

          <Form.Field>
            <label>Categories</label>
            <select
              {...register("categories", { required: true })}
            >
              {
                productOption.map(option => (
                  <option key={`${option.key}`} value={`${option.value}`}>{option.text}</option>
                ))
              }
            </select>
            {errors.categories && <span>This field is required</span>}
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <textarea rows="5" type="text-area"  {...register("description", { required: true })} />
            {errors.description && <span>This field is required</span>}
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>Price</label>
              <input type="number" {...register("sellPrice", { required: true })} />
              {errors.sellPrice && <span>This field is required</span>}
            </Form.Field>
            <Form.Field>
              <label>Rent</label>
              <input type="number" {...register("rentPrice", { required: true })} />
              {errors.rentPrice && <span>This field is required</span>}
            </Form.Field>
            <Form.Field>
              <label>Rent Type</label>
              <select
                {...register("rentType", { required: true })}
              >
                {
                  rentOption.map(option => (
                    <option key={`${option.key}`} value={`${option.value}`}>{option.text}</option>
                  ))
                }
              </select>
              {errors.rentType && <span>This field is required</span>}
            </Form.Field>
          </Form.Group>
          
          <button className='ui blue button' type="submit">Add Product</button>
        </Form>
      </Grid.Row>
    </Grid>
  );
};

export default AddProducts;