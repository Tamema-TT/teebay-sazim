import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

const PageHeader = ({header}) => {
  return (
    <Grid centered>
      <Container style={{ marginTop: "20px" }}>
        <h1 className="ui header grey">{header}</h1>
      </Container>
    </Grid>
  );
};

export default PageHeader;