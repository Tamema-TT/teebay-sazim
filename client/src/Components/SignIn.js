import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Grid, Segment } from 'semantic-ui-react';
import { LOAD_USERS } from '../GraphQL/Queries';
import PageHeader from './PageHeader';

const SignIn = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  const [invalidUser, setInvalidUser] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);
  
  const loggedInUser = (data) => {
    users.map(user => {
      if(user.email === data.email && user.password === data.password) {
        navigate(`/myProducts/${user.id}`);
      }
      else {
        setInvalidUser(true);
      }
    })
  }
  return (
    <Grid centered padded columns={12} >

      <PageHeader header="Sign In"></PageHeader>

      <Segment padded='very' style={{ marginTop: "20px" }}>
        {
          invalidUser && (
            <div className='ui red'>
              <p style={{ marginTop: "10px", color: "red" }}>Invalid Credential</p>
            </div>
          )
        }
        <Form onSubmit={handleSubmit(loggedInUser)}>
          <Form.Field>
            <input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              })} />
            {errors.email && <span role="alert">{errors.email.message}</span>}
          </Form.Field>

          <Form.Field>
            <input
              placeholder='Password'
              {...register("password", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5"
                }
              })}
              type="password"
            />
            {errors.password && <span role="alert">{errors.password.message}</span>}
          </Form.Field>

          <button className='ui blue button' type="submit">LOGIN</button>
        </Form>
        <p style={{ marginTop: "10px" }}>Don't have an account?
          <Link to="/">
            <span> Sign Up</span>
          </Link>
        </p>
      </Segment>
    </Grid>
  );
};

export default SignIn;