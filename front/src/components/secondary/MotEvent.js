import React, { useState } from 'react';
import classnames from 'classnames';
export default function MotEvent(props) {
  const [drop, setdrop] = useState(false);
  const toggleDrop = e => {
    e.preventDefault();
    setdrop(!drop);
  };
  const motEvent = props.item;
  return (
    <React.Fragment>
      {props.index !== 0 ? <hr className="dropdown-divider" /> : null}
      <div className="dropdown-item  main-item is-paddingless">
        <div className="has-text-centered is-marginless mot-main-info">
          <div>
            {motEvent.status === 'pass' ? (
              <span className="mot-status pass has-text-success">Passed</span>
            ) : (
              <span className="mot-status fail has-text-danger">Failed</span>
            )}
          </div>
          <div>{motEvent.date}</div>
          <div className="is-italic">Miles driven since : {props.driven}</div>
        </div>
        {motEvent.data.notices.length > 0 ||
        motEvent.data.refusal.length > 0 ? (
          <div
            className={classnames('expand-dropdown-button mot-expand-btn', {
              active: drop
            })}
            onClick={toggleDrop}
          >
            <div className="dropdown">
              <div className="dropdown-trigger">
                <div aria-haspopup="true" aria-controls="dropdown-menu2">
                  <span className="icon is-small sub-btn">
                    <i className="fas fa-angle-right" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div
                className={classnames('dropdown-menu drp ', {
                  'is-hidden': !drop
                })}
                id="dropdown-menu2"
                role="menu"
              >
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    {motEvent.data.notices.length > 0 ? (
                      <div className="advisories expand-dropdown-container">
                        <h4 className="has-text-info is-italic is-size-6">
                          Advisory notice reasons:
                        </h4>
                        <ol>
                          {motEvent.data.notices.map((reason, index) => (
                            <li key={index}>{reason.split('(')[0]}</li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                    {motEvent.data.refusal.length > 0 ? (
                      <div className="refusal expand-dropdown-container">
                        <h4 className="has-text-danger is-italic is-size-6">
                          Reasons for refusal:
                        </h4>
                        <ol>
                          {motEvent.data.refusal.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}