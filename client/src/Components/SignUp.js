import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Grid, Segment } from 'semantic-ui-react';
import PageHeader from './PageHeader';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const addNewUser = (data) => {
    navigate("/myProducts");
  }
  
  return (
    <Grid centered padded columns={8} >
    
      <PageHeader header="Sign Up"></PageHeader>

      <Segment padded='very' style={{ marginTop: "20px" }}>
        <Form onSubmit={handleSubmit(addNewUser)}>
      
          <Form.Group widths='equal'>
            <Form.Field>
              <input placeholder="First Name" {...register("firstName", { required: true })} />
              {errors.firstName && <span>This field is required</span>}
            </Form.Field>
            <Form.Field>
              <input placeholder="Last Name" {...register("lastName", { required: true })} />
              {errors.lastName && <span>This field is required</span>}
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <input placeholder="Address" {...register("address", { required: true })} />
            {errors.address && <span>This field is required</span>}
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <input
                placeholder="Email"
                type="email"
                {...register("email",{
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })} />
              {errors.email && <span role="alert">{errors.email.message}</span>}
            </Form.Field>
            <Form.Field>
              <input placeholder="Phone Number" {...register("phoneNumber", { required: true })} />
              {errors.phoneNumber && <span>This field is required</span>}
            </Form.Field>
          </Form.Group>

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

          <Form.Field>
            <input
              placeholder='Confirm Password'
              {...register("confirmPassword", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5"
                }
              })}
              type="password"
            />
            {errors.confirmPassword && <span role="alert">{errors.confirmPassword.message}</span>}
          </Form.Field>

          <button className='ui blue button' type="submit">REGISTER</button>
        </Form>

        <p style={{marginTop: "10px"}}>Already have an account?
          <Link to="/signIn">
            <span> Sign in</span>
          </Link>
        </p>
      </Segment>
    </Grid>
  );
};

export default SignUp;