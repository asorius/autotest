import React from 'react';

import 'fontsource-roboto';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function LandingPage(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        height: '100%',
        width: '100%',
        minHeight: '10rem',
        zIndex: '2',
        background: '#ffffffde',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5rem',
      }}
    >
      <CircularProgress size={150} thickness={5} />
    </div>
  );
}
