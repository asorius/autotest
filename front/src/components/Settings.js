import React, { useState, useContext } from 'react';
import classnames from 'classnames';

import Context from '../context/context';
// import Checkbox from './secondary/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { IconButton, Tooltip } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HomeIcon from '@material-ui/icons/Home';
import HighlightOffIcon from '@material-ui/icons/Delete';
export default function Settings() {
  const context = useContext(Context);
  const [modal, setModal] = useState(false);
  const [copy, setCopy] = useState(false);
  // const [settings, setSettings] = useState(context.settings);
  const [checkboxes, setCheckbox] = useState(
    context.options.map((option) => ({
      ...option,
      isSelected: context.settings.includes(option.value),
    }))
  );
  React.useEffect(() => {
    setCheckbox(
      context.options.map((option) => ({
        ...option,
        isSelected: context.settings.includes(option.value),
      }))
    );
  }, [context.settings]);
  const redirectPrivate = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };
  const onCheckFn = (e) => {
    const { value } = e.target;

    setCheckbox(
      checkboxes.map((el) => {
        if (el.value === value) {
          el.isSelected = !el.isSelected;
        }
        return el;
      })
    );
  };
  const openModal = (e) => {
    setModal(!modal);
  };
  React.useEffect(() => {
    !copy ||
      setTimeout(() => {
        setCopy(!copy);
      }, 800);
  }, [copy]);
  const submit = (e) => {
    const newSettings = checkboxes
      .filter((el) => el.isSelected)
      .map((el) => el.value);

    e.preventDefault();
    context.updateSettings(newSettings);
    setTimeout(() => {
      setModal(!modal);
    }, 200);
  };

  const createSharingList = (e) => {
    e.preventDefault();
    const urls = context.list.reduce(
      (accumulator, current) => [...accumulator, current.actualLink],
      []
    );
    const data = { key: context.sharekey, list: urls };
    console.log({ dataToCreateShareList: data });
    context.saveCarList(data);
  };
  const deleteList = (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Are you sure you want to delete this list?'
    );
    confirm &&
      context.deleteList(context.sharekey).then((res) => {
        console.log(res);
        res === 'success'
          ? (window.location.href = '/')
          : alert('deletion failed...');
      });
  };
  return (
    <div
      className=" center"
      onClick={(e) => {
        if (e.target.classList.contains('modal-background')) {
          openModal();
        }
      }}
    >
      <Fab
        onClick={openModal}
        size="small"
        style={{ position: 'fixed', bottom: '1.1rem', right: '5rem' }}
      >
        <SettingsIcon></SettingsIcon>
      </Fab>
      {context.sharekey && (
        <div
          style={{
            position: 'fixed',
            top: '1.1rem',
            right: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Tooltip
            title="This is a shared page. Click here to go back to private page"
            aria-label="go-home"
          >
            <IconButton>
              <ArrowBackIcon> </ArrowBackIcon>
              <HomeIcon color="primary" fontSize="large"></HomeIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this shared list" aria-label="go-delete">
            <IconButton color="secondary" onClick={deleteList}>
              <HighlightOffIcon
                style={{ color: 'red' }}
                fontSize="large"
              ></HighlightOffIcon>
            </IconButton>
          </Tooltip>
          {/* <Chip
            clickable
            icon={<ArrowBackIcon></ArrowBackIcon>}
            onClick={redirectPrivate}
            size="small"
            style={{ textTransform: 'none', fontSize: '.7rem' }}
            label="This is a shared page. Click here to go back to private page."
          ></Chip>
          <Chip
            clickable
            icon={
              <HighlightOffIcon style={{ color: 'red' }}></HighlightOffIcon>
            }
            onClick={deleteList}
            size="small"
            style={{ textTransform: 'none', fontSize: '.7rem', color: 'red' }}
            label="Delete"
          ></Chip> */}
        </div>
      )}
      <div className={classnames('modal', { 'is-active': modal })}>
        <div className="modal-background" />
        <div className="modal-content mdl">
          <form className="form" onSubmit={submit}>
            <Paper
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(35%,1fr))',
              }}
            >
              {checkboxes.map((el) => (
                <FormControlLabel
                  key={Math.random()}
                  control={
                    <Checkbox
                      checked={el.isSelected}
                      onChange={onCheckFn}
                      value={el.value}
                      color="secondary"
                    />
                  }
                  label={el.name}
                  style={{
                    color: el.isSelected ? 'lightgrey' : 'black',
                    height: '3.5rem',
                    paddingLeft: '2rem',
                  }}
                />
              ))}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                style={{
                  width: '50%',
                  margin: '.5rem auto',
                  gridColumn: '1 / span 2',
                }}
              >
                Save settings
              </Button>
              <div
                className="contect has-text-centered"
                style={{
                  margin: '.5rem auto',
                  gridColumn: '1 / span 2',
                  width: '100%',
                }}
              >
                {context.sharekey !== null ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '80%',
                      justifyContent: 'space-around',
                      margin: '0 auto',
                    }}
                  >
                    <TextField
                      readOnly
                      value={`${window.location.href}${context.sharekey}`}
                      fullWidth
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '30%',
                        paddingLeft: '1rem',
                      }}
                    >
                      <Tooltip title="Open in new tab" aria-label="open">
                        <IconButton
                          href={`${window.location.href}${context.sharekey}`}
                          target="_blank"
                          size="small"
                          rel="noopener noreferrer"
                        >
                          <OpenInNewIcon color="primary"></OpenInNewIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy to clipboard" aria-label="copy">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.href}${context.sharekey}`
                            );
                            setCopy(!copy);
                          }}
                        >
                          {copy ? (
                            <DoneAllIcon style={{ color: 'green' }} />
                          ) : (
                            'Copy'
                          )}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={createSharingList}
                  >
                    Generate sharable link
                  </Button>
                )}
              </div>
            </Paper>
          </form>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={openModal}
        />
      </div>
    </div>
  );
}
