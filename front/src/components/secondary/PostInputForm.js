import React, { useContext, useState, useEffect } from 'react';
import Context from '../../context/context';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
export default function PostInput() {
  const context = useContext(Context);
  const postFromContext = context.postcode.postcodeData;
  // const postFromContext = context.postcode.postcodeData.postcode;
  const [postInputValue, setPostValue] = useState('');
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    //context.postcode is {postcodeData:{postcode,lat?,lng?}}
    if (postFromContext) {
      setPostcode(postFromContext.postcode);
    }
  }, [postFromContext]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        setError(!error);
        setPostValue('');
      }, 2000);
    }
  }, [loading, error]);

  const onPostChange = (e) => {
    setPostValue(e.target.value.toUpperCase().trim().replace(/\s+/g, ''));
  };
  const addPost = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (postInputValue.length < 4) {
      context.setError({ msg: 'Postcode too short', to: 'post' });
      setError(true);
      setPostValue('');
    } else {
      try {
        const res = await context.addPostToList(postInputValue);
        if (res.res !== null) {
          const urls = context.list.map((el) => el.actualLink);
          context.list.forEach((element) => {
            context.removeCarFromList(element._id);
          });
          context.updateListWithNewSettings({
            urls,
            newSettings: context.settings,
          });
          setPostcode(res.res);
          setPostValue('');
          setLoading(!loading);
        } else {
          context.setError({ msg: 'Invalid postcode', to: 'post' });
          setError(!error);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onDeletePostcode = (e) => {
    e.preventDefault();
    context.removePostFromList(postcode);
    setPostcode(false);
    const urls = context.list.map((el) => el.actualLink);
    context.list.forEach((element) => {
      context.removeCarFromList(element._id);
    });
    context.updateListWithNewSettings({
      urls,
      newSettings: context.settings,
    });
  };

  return (
    <form
      className="control postcode "
      noValidate
      autoComplete="on"
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
                  postcode
                    ? 'New location'
                    : context.errors.to === 'post'
                    ? `${context.errors.msg} !`
                    : 'Your postcode'
                }
                variant="outlined"
                disabled={loading}
                value={postInputValue}
                spellCheck="false"
                color="secondary"
                error={error}
              />
            </Grid>
            <Grid item>
              {postcode ? (
                <Chip
                  label={`Current postcode : ${postcode}`}
                  onDelete={onDeletePostcode}
                  variant="outlined"
                  color="secondary"
                />
              ) : (
                <Chip
                  label="Enter postcode to get directions from you to the car"
                  variant="outlined"
                ></Chip>
              )}
            </Grid>
            <Grid item>
              {loading && postInputValue && error === false ? (
                <CircularProgress />
              ) : (
                <Button
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={error}
                  startIcon={<SearchIcon />}
                >
                  {' '}
                  Find
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
