import React, { useContext, useState } from 'react';
import Context from '../../context/context';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/AddCircleOutline';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import DoneAllIcon from '@material-ui/icons/DoneAll';
const InputsForm = () => {
  const context = useContext(Context);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const onChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };
  const handleClose = () => setOpen(false);

  const addCarFunc = async (e) => {
    setLoading(!loading);
    e.preventDefault();
    try {
      if (inputValue.length < 10) {
        context.setError({ msg: 'Please provide valid link', to: 'add' });
        setError(true);
        setInputValue('');
      } else {
        await context.addCarToList({
          url: inputValue,
          settings: context.settings,
        });
        setInputValue('');
        setOpen(!open);
      }
    } catch (e) {
      return { errored: e };
    }
    setTimeout(() => {
      setError(false);
      setLoading(false);
    }, 2000);
  };

  return (
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
        value={inputValue}
        onChange={onChange}
        variant="outlined"
        fullWidth
        disabled={loading}
        error={error}
      ></TextField>

      {loading && inputValue.length !== 0 && !error ? (
        <LinearProgress />
      ) : (
        <Button
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          disabled={error}
          startIcon={<Icon />}
          style={{ width: '50%', margin: '1rem auto' }}
        >
          {' '}
          Add
        </Button>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Chip icon={<DoneAllIcon />} label="Great Success!" color="secondary" />
      </Snackbar>
    </form>
  );
};
export default InputsForm;
