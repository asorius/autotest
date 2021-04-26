import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
export default function TabPanelItem(props) {
  return (
    <div style={{ zIndex: 700000, padding: '.5rem' }}>
      <Typography variant="h6">Advisories:</Typography>
      <List dense={true}>
        {props.notices.length > 0 ? (
          props.notices.map((reason, index) => (
            <ListItem key={200 + index}>
              <ListItemText primary={reason.split('(')[0]} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No information available" />
          </ListItem>
        )}
      </List>
      <Typography variant="h6">Refusals:</Typography>

      <List dense={true}>
        {props.refusal.length > 0 ? (
          props.refusal.map((reason, index) => (
            <ListItem key={300 + index}>
              <ListItemText primary={reason} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No information available" />
          </ListItem>
        )}
      </List>
    </div>
  );
}
