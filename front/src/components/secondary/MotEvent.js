import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Paper from '@material-ui/core/Paper';
export default function MotEvent(props) {
  const [open, setOpen] = useState(false);
  const motEvent = props.item;
  const toggleDrop = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <List
        aria-labelledby="nested-list-subheader"
        style={{ position: 'relative' }}
      >
        <ListItem button onClick={toggleDrop} style={{ position: 'relative' }}>
          {/* Failed or Passed icon  */}
          <ListItemIcon>
            {motEvent.status === 'pass' ? (
              <CheckCircleOutlineIcon
                style={{ color: 'green' }}
              ></CheckCircleOutlineIcon>
            ) : (
              <NotInterestedIcon style={{ color: 'red' }}></NotInterestedIcon>
            )}
          </ListItemIcon>
          {/* Failed or passed text with event date plus miles driven since last mot event*/}
          <ListItemText
            primary={`${motEvent.date}`}
            secondary={`Miles driven since : ${props.driven}`}
          />
          {/* Check if there are actually any information in mot event and wether to show expand action icons */}
          {motEvent.data.notices.length === 0 ? null : (
            <KeyboardArrowRight
              style={{
                transition: 'all .5s',
                transform: `${open ? 'rotate(180deg)' : 'rotate(0)'}`,
              }}
            />
          )}
        </ListItem>
        {/* Collapse is the side pop up with more details of mot check */}
        <Paper
          style={{
            position: 'absolute',
            left: '100%',
            width: '100%',
            bottom: 0,
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              disablePadding
              style={{ maxHeight: '40vh', overflowY: 'scroll' }}
            >
              {motEvent.data.notices.length > 0 ? (
                <ListItem>
                  <List disablePadding>
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
          </Collapse>
        </Paper>
      </List>
    </React.Fragment>
  );
}
