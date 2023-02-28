import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

const AllButtons = ({ userId }) => {
  const navigate = useNavigate();
  const navigateProducts = (routeName) => {
    navigate(`/${routeName}/${userId}`)
  }
  return (
    <div style={{display: "flex", marginTop: "20px"}}>
      <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <button className='ui green button' type="submit">My Activity</button>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <button onClick={() => navigateProducts("myProducts")} className='ui teal button' type="submit">My Products</button>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <button onClick={() => navigateProducts("allProducts")} className='ui orange button' type="submit">All Products</button>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <button className='ui red button' type="submit">LOGOUT</button>
          </Grid.Column>
      </Grid.Row>
    </div>
  );
};

export default AllButtons;