import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import { setTimeout } from 'timers';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';

import PostInput from './secondary/PostInput';
const InputsForm = () => {
  const context = useContext(Context);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState(false);

  // useEffect(() => {
  //   if (context.errors.to === 'add') {
  //     setAddError(!addError);
  //   } else if (context.errors.to === 'post') {
  //     setPostError(!postError);
  //   } else {
  //     setAddError(false);
  //     setPostError(false);
  //   }
  // }, [context.errors.to, addError, postError]);

  const onChange = (e) => {
    setUrl(e.target.value.toLowerCase());
  };

  const addCarFunc = async (e) => {
    setLoading(!loading);
    e.preventDefault();
    try {
      const res = await context.addCarToList({
        url,
        settings: context.settings,
      });
      setAddError(!res);
      setLoading(false);
      // ERRORS CAUSES ALL CAR CAR ELEMENTS TO REMOUNT FOR SOME REASON
      setUrl('');
    } catch (e) {
      return { errored: e };
    }
    setAddError(false);
  };

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
          {/* Postcode stuff item */}
          <PostInput></PostInput>
        </Grid>

        <Grid item xs={12} style={{ height: '10rem' }}>
          {/* Links input stuff item */}
          <form
            noValidate
            autoComplete="off"
            onSubmit={addCarFunc}
            style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}
          >
            <TextField
              id="urlInput"
              label={
                context.errors.to === 'add'
                  ? `${context.errors.msg} !`
                  : 'Paste links from Autotrader here'
              }
              value={url}
              onChange={onChange}
              variant="outlined"
              fullWidth
              disabled={loading}
              error={addError}
            ></TextField>

            {loading && url.length !== 0 && !addError ? (
              <LinearProgress />
            ) : (
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                disabled={addError}
                startIcon={<Icon />}
                style={{ width: '50%', margin: '1rem auto' }}
              >
                {' '}
                Add
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
export default InputsForm;
