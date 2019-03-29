import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import Context from '../context/context';
import Checkbox from './Checkbox';
export default function Settings() {
  const context = useContext(Context);
  const [settings, addSetting] = useState(context.settings);
  const [modal, setModal] = useState(false);
  //---------------------
  console.log(context.settings);
  const settingsList = [
    'year',
    'engine',
    'mileage',
    'fuel',
    'transmission',
    'tax',
    'exchange',
    'co2',
    'urban',
    'extra',
    'combined',
    'acceleration',
    'topspeed',
    'cylinders',
    'enginepower',
    'torquer',
    'electrics',
    'safety',
    'tank',
    'weight',
    'map'
  ];
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
    <section className="container section">
      <button className="button" onClick={openModal}>
        settings
      </button>
      <div className={classnames('modal', { 'is-active': modal })}>
        <div className="modal-background" />
        <div className="modal-content mdl">
          <form className="form" onSubmit={submit}>
            <div className="field flx is-grouped is-grouped-centered">
              <Checkbox list={settingsList} check={onCheck} />
              <button type="submit" className="button">
                Save
              </button>
            </div>
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
