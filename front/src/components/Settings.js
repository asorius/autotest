import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import Context from '../context/context';
import Checkbox from './secondary/Checkbox';
import Button from '@material-ui/core/Button';

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
    <div className=" center">
      <Button variant="outlined" onClick={openModal} color="textSecondary">
        Settings
      </Button>

      <div className={classnames('modal', { 'is-active': modal })}>
        <div className="modal-background" />
        <div className="modal-content mdl">
          <form className="form" onSubmit={submit}>
            <div className="field mdl-labels is-grouped is-grouped-centered">
              {checkboxes.map((el) => (
                <Checkbox
                  name={el.name}
                  value={el.value}
                  isSelected={el.isSelected}
                  onCheckboxChange={onCheckFn}
                  key={Math.random()}
                />
              ))}
            </div>

            <button type="submit" className="button">
              Save
            </button>
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
