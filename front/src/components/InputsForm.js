import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import { setTimeout } from 'timers';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
export default function InputsForm() {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setPostLoading] = useState(false);
  const context = useContext(Context);
  const [addError, setAddError] = useState(false);
  const [postError, setPostError] = useState(false);
  useEffect(() => {
    if (context.errors.to === 'add') {
      setAddError(!addError);
    } else if (context.errors.to === 'post') {
      setPostError(!postError);
    } else {
      setAddError(false);
      setPostError(false);
    }
  }, [context]);

  const onChange = (e) => {
    setUrl(e.target.value.toLowerCase());
  };

  const onPostChange = (e) => {
    setPost(e.target.value.toUpperCase().trim().replace(/\s+/g, ''));
  };

  const addCarFunc = async (e) => {
    setLoading(!loading);
    e.preventDefault();
    try {
      await context.addCarToList({ url, settings: context.settings });

      setLoading(false);
      setUrl('');
    } catch (e) {
      return { errored: e };
    }
  };
  const addPost = async (e) => {
    setPostLoading(!loadingPost);

    e.preventDefault();
    if (post.length < 4) {
      context.setError({ msg: 'Invalid postcode', to: 'post' });
      setTimeout(() => {
        setPost('');
        setPostLoading(false);
      }, 500);
      return;
    }
    try {
      await context.addPostToList(post);
      const urls = context.list.map((el) => el.actualLink);
      context.list.forEach((element) => {
        context.removeCarFromList(element._id);
      });
      context.updateListWithNewSettings({
        urls,
        newSettings: context.settings,
      });
      setTimeout(() => {
        setPost('');
        setPostLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
    }
  };
  const onDeletePostcode = (e) => {
    e.preventDefault();

    context.removePostFromList(context.postcode.postcode);
    const urls = context.list.map((el) => el.actualLink);
    context.list.forEach((element) => {
      context.removeCarFromList(element._id);
    });
    context.updateListWithNewSettings({ urls, newSettings: context.settings });
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
          <form
            className="control postcode "
            noValidate
            autoComplete="off"
            onSubmit={addPost}
          >
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <TextField
                      onChange={onPostChange}
                      label={
                        context.postcode.postcode
                          ? 'New location'
                          : context.errors.to === 'post'
                          ? `${context.errors.msg} !`
                          : 'Your postcode'
                      }
                      variant="outlined"
                      disabled={loadingPost}
                      error={postError}
                      value={post}
                      color="secondary"
                    />
                  </Grid>
                  <Grid item>
                    {loadingPost && post && postError === false ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        size="medium"
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        disabled={postError}
                        startIcon={<SearchIcon />}
                      >
                        {' '}
                        Find
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {context.postcode ? (
                  <Chip
                    label={`Current postcode : ${context.postcode.postcode}`}
                    onDelete={onDeletePostcode}
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    label="Enter postcode to get directions from you to the car"
                    color="secondary"
                  ></Chip>
                )}
              </Grid>
            </Grid>
          </form>
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
              label="Paste links from Autotrader"
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
}
