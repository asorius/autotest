import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import Context from '../context/context';
// import Checkbox from './secondary/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Settings() {
  const context = useContext(Context);
  const [modal, setModal] = useState(false);
  const [checkboxes, setCheckbox] = useState(
    context.options.map((option) => ({
      ...option,
      isSelected: context.settings.indexOf(option.value) < 0 ? false : true,
    }))
  );
  const onCheckFn = (e) => {
    const { value } = e.target;
    setCheckbox(
      checkboxes.map((el) => {
        if (el.value === value) {
          if (context.settings.indexOf(e.target.name) < 0) {
            //means its a new setting, so add it and set its state to checked
            context.updateSettings([...context.settings, e.target.name]);
          } else {
            //means it was already there so its filtered out and unchecked
            const neww = context.settings.filter((el) => el !== e.target.name);
            context.updateSettings([...neww]);
          }
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
    console.log(checkboxes);
    console.log(context.settings);
    e.preventDefault();
    const urls = context.list.map((el) => el.actualLink);
    context.list.forEach((element) => {
      context.removeCarFromList(element._id);
    });
    context.updateListWithNewSettings({ urls, newSettings: context.settings });
    setTimeout(() => {
      setModal(!modal);
    }, 500);
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
      <Button variant="outlined" onClick={openModal}>
        Settings
      </Button>

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
                style={{ width: '50%', margin: '1rem auto' }}
              >
                Save settings
              </Button>
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
