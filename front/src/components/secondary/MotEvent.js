import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Paper from '@material-ui/core/Paper';
export default function MotEvent(props) {
  const [open, setOpen] = useState(false);
  const toggleDrop = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const motEvent = props.item;
  return (
    <React.Fragment>
      <List
        component="div"
        aria-labelledby="nested-list-subheader"
        style={{ position: 'relative' }}
      >
        <ListItem button onClick={toggleDrop} style={{ position: 'relative' }}>
          <ListItemIcon>
            {motEvent.status === 'pass' ? (
              <CheckCircleOutlineIcon
                style={{ color: 'green' }}
              ></CheckCircleOutlineIcon>
            ) : (
              <NotInterestedIcon style={{ color: 'red' }}></NotInterestedIcon>
            )}
          </ListItemIcon>
          <ListItemText
            primary={`${motEvent.status === 'pass' ? 'Passed' : 'Failed'} / ${
              motEvent.date
            }`}
            secondary={`Miles driven since : ${props.driven}`}
          />
          {open ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Paper
            style={{
              position: 'absolute',
              left: '100%',
              width: '100%',
              bottom: 0,
            }}
          >
            <List component="div" disablePadding>
              {motEvent.data.notices.length > 0 ? (
                <ListItem>
                  <List component="div" disablePadding>
                    <ListItemText primary="Advisory notice reasons:"></ListItemText>
                    <List>
                      {motEvent.data.notices.map((reason, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            secondary={reason.split('(')[0]}
                          ></ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </List>
                </ListItem>
              ) : null}
              {motEvent.data.refusal.length > 0 ? (
                <ListItem>
                  <List component="div" disablePadding>
                    <ListItemText primary="Reasons for refusal:"></ListItemText>
                    <List>
                      {motEvent.data.refusal.map((reason, index) => (
                        <ListItem key={index}>
                          <ListItemText secondary={reason}></ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </List>
                </ListItem>
              ) : null}
            </List>
          </Paper>
        </Collapse>
      </List>
      {/* {props.index !== 0 ? <hr className="dropdown-divider" /> : null}
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
      </div> */}
    </React.Fragment>
  );
}
