import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import Context from '../context/context';

export default function Settings() {
  const context = useContext(Context);
  const [settings, addSetting] = useState(context.settings);
  const [modal, setModal] = useState(false);
  const openModal = e => {
    setModal(!modal);
  };
  const onCheck = e => {
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
    <section>
      <button className="button" onClick={openModal}>
        settings
      </button>
      <div className={classnames('modal', { 'is-active': modal })}>
        <div className="modal-background" />
        <div className="modal-content">
          <form onSubmit={submit}>
            <div className="container">
              <label htmlFor="urban">
                urban
                <input
                  type="checkbox"
                  name="urban"
                  id="urban"
                  onChange={onCheck}
                />
              </label>
              <label htmlFor="extra">
                extra
                <input
                  type="checkbox"
                  name="extra"
                  id="extra"
                  onChange={onCheck}
                />
              </label>
              <label htmlFor="combined">
                combined
                <input
                  type="checkbox"
                  name="combined"
                  id="combined"
                  onChange={onCheck}
                />
              </label>
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
