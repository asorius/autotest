import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ChartItem from './ChartItem';
export default function HistoryChart({ miles, mileageDataForDisplay }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setOpen(!open);
    setExpanded(!expanded);
  };
  const id = open ? 'miles-history' : undefined;
  console.log({ mileageDataForDisplay });
  return (
    <>
      <Button
        aria-describedby={id}
        color="secondary"
        variant="contained"
        onClick={handleClick}
        aria-label="show more"
      >
        Mileage
        <ExpandLess
          style={{
            transition: 'all .5s',
            transform: `${expanded ? 'rotate(180deg)' : 'rotate(0)'}`,
          }}
        />
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="right-end"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClick}>
          <Paper>
            {mileageDataForDisplay && mileageDataForDisplay.length > 0 ? (
              <ChartItem mileages={mileageDataForDisplay}></ChartItem>
            ) : (
              'Not Available'
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
