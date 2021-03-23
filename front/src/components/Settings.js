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
import TextField from '@material-ui/core/TextField';
export default function Settings() {
  const context = useContext(Context);
  const [modal, setModal] = useState(false);
  const [checkboxes, setCheckbox] = useState(
    context.options.map((option) => ({
      ...option,
      isSelected: context.settings.indexOf(option.value) < 0 ? false : true,
    }))
  );
  // const [userSelectedOptions, setOptions] = useState([]);
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

  const submit = (e) => {
    const newSettings = checkboxes
      .filter((el) => el.isSelected)
      .map((el) => el.value);

    e.preventDefault();
    context.updateSettings(newSettings);
    // setOptions(newSettings);
    // const urls = context.list.map((el) => el.actualLink);
    // context.list.forEach((element) => {
    //   context.removeCarFromList(element._id);
    // });
    // context.updateListWithNewSettings({ urls, newSettings });
    setTimeout(() => {
      setModal(!modal);
    }, 200);
  };
  const shareList = (e) => {
    e.preventDefault();
    const urls = context.list.reduce(
      (accumulator, current) => [...accumulator, current.actualLink],
      []
    );
    const data = { key: context.sharekey, list: urls };
    context.saveCarList(data);
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
                style={{ margin: '.5rem auto', gridColumn: '1 / span 2' }}
              >
                {context.sharekey !== null ? null : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={shareList}
                  >
                    Generate sharable link
                  </Button>
                )}
                {context.sharekey !== null ? (
                  <TextField
                    readOnly
                    value={`${window.location.href}${context.sharekey}`}
                  />
                ) : null}
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
