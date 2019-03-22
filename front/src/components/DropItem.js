import React, { useState } from 'react';
import classnames from 'classnames';
export default function DropItem(props) {
  const [drop, setDrop] = useState(false);
  const capitalized = s => {
    const ns = s
      .toString()
      .substring(11, s.toString().length)
      .charAt(0)
      .toUpperCase();
    return ns + s.slice(12);
  };
  const toggleDrop = e => {
    e.preventDefault();
    setDrop(!drop);
  };
  const motEvent = props.item;
  return (
    <React.Fragment>
      {props.index !== 0 ? <hr className="dropdown-divider" /> : null}
      <div className="dropdown-item columns ">
        <div className="column is-three-quarters has-text-centered">
          <div>
            {capitalized(motEvent.status) === 'Pass' ? (
              <span className="mot-status pass has-text-success">Passed</span>
            ) : (
              <span className="mot-status fail has-text-danger">Failed</span>
            )}
          </div>
          <div>{motEvent.eventDate}</div>
          <div className="is-italic">
            Miles driven since last MOT : {props.driven}
          </div>
        </div>
        {motEvent.data['advisory_notice_reasons'].length > 0 ||
        motEvent.data['reason_for_refusal_to_issue_certificate'].length > 0 ? (
          <div
            className={classnames('column expand-dropdown-button', {
              active: drop
            })}
            onClick={toggleDrop}
          >
            <div className="dropdown">
              <div className="dropdown-trigger">
                <div aria-haspopup="true" aria-controls="dropdown-menu2">
                  <span className="icon is-small">
                    <i className="fas fa-angle-right" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div
                className={classnames('dropdown-menu', { 'is-hidden': !drop })}
                id="dropdown-menu2"
                role="menu"
              >
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    {motEvent.data['advisory_notice_reasons'].length > 0 ? (
                      <div className="advisories expand-dropdown-container">
                        <h4 className="has-text-info is-italic is-size-6">
                          Advisory notice reasons:
                        </h4>
                        <ol>
                          {motEvent.data['advisory_notice_reasons'].map(
                            (reason, index) => (
                              <li key={index}>{reason}</li>
                            )
                          )}
                        </ol>
                      </div>
                    ) : null}
                    {motEvent.data['reason_for_refusal_to_issue_certificate']
                      .length > 0 ? (
                      <div className="refusal expand-dropdown-container">
                        <h4 className="has-text-danger is-italic is-size-6">
                          Reasons for refusal:
                        </h4>
                        <ol>
                          {motEvent.data[
                            'reason_for_refusal_to_issue_certificate'
                          ].map((reason, index) => (
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
