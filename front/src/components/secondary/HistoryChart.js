import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { useSpring, animated } from 'react-spring';
import ChartItem from './ChartItem';
export default function HistoryChart({ miles, mileageDataForDisplay }) {
  const refButton = React.useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e) => {
    !anchorEl && setAnchorEl(refButton.current);
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
        ref={refButton}
        size="small"
        style={{ textTransform: 'none' }}
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
          <animated.div
            style={useSpring({
              from: { opacity: 0 },
              to: { opacity: open ? 1 : 0 },
            })}
          >
            <Paper>
              {mileageDataForDisplay && mileageDataForDisplay.length > 0 ? (
                <ChartItem mileages={mileageDataForDisplay}></ChartItem>
              ) : (
                'Not Available'
              )}
            </Paper>
          </animated.div>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
