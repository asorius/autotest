import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LinkInputForm from './secondary/LinkInputForm';
import PostInputForm from './secondary/PostInputForm';
const InputFormsContainer = () => {
  return (
    <Container style={{ marginTop: '1rem' }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <PostInputForm></PostInputForm>
        </Grid>

        <Grid item xs={12} style={{ height: '10rem' }}>
          <LinkInputForm></LinkInputForm>
        </Grid>
      </Grid>
    </Container>
  );
};
export default InputFormsContainer;
