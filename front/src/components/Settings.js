import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import Context from '../context/context';
import Checkbox from './Checkbox';
export default function Settings() {
  const context = useContext(Context);
  const [settings, addSetting] = useState(context.settings);
  const [modal, setModal] = useState(false);
  //---------------------
  const settingsList = ['urban', 'extra', 'combined'];
  //----------------------
  const openModal = e => {
    setModal(!modal);
  };
  const onCheck = e => {
    console.log(e.target);
    if (settings.indexOf(e.target.name) < 0) {
      addSetting([...settings, e.target.name]);
    } else {
      const neww = settings.filter(el => el !== e.target.name);
      addSetting([...neww]);
    }
  };
  const submit = e => {
    e.preventDefault();
    context.updateSettings(settings);
    setModal(!modal);
  };
  return (
    <section className="container">
      <button className="button" onClick={openModal}>
        settings
      </button>
      <div className={classnames('modal', { 'is-active': modal })}>
        <div className="modal-background" />
        <div className="modal-content">
          <form className="form" onSubmit={submit}>
            <div className="container">
              <div className="field is-grouped is-grouped-centered">
                <Checkbox list={settingsList} check={onCheck} />
              </div>
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
    </section>
  );
}
