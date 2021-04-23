import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import TabPanelItem from './TabPanelItems';
export default function MotHistory({ events }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleClick = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setOpen(!open);
    setExpanded(!expanded);
  };
  const handleChange = (e, newValue) => setValue(newValue);
  const id = open ? 'simple-popper' : undefined;
  return (
    <>
      <Button
        aria-describedby={id}
        color="primary"
        variant="contained"
        onClick={handleClick}
        aria-label="show more"
      >
        MOT history
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
          <Paper
            style={{
              visibility: 'visible',
              opacity: 1,
              display: 'flex',
              height: '20rem',
            }}
          >
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-evenly',
              }}
            >
              {events || events.length < 0
                ? events.map((item, index) => {
                    if (index < 5) {
                      return (
                        <Tab
                          key={index + 999}
                          label={
                            item.status === 'pass' ? (
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                }}
                              >
                                <CheckCircleOutlineIcon
                                  style={{ color: 'green' }}
                                ></CheckCircleOutlineIcon>
                                {item.date}
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                }}
                              >
                                <NotInterestedIcon
                                  style={{ color: 'red' }}
                                ></NotInterestedIcon>
                                {item.date}
                              </div>
                            )
                          }
                          id={`vertical-tab-${index}`}
                        ></Tab>
                      );
                    }
                    return null;
                  })
                : null}
            </Tabs>
            {/* STOPED HERE ON DISPLAYING TABPANEL */}

            {events || events.length < 0
              ? events.map((item, index) => {
                  if (index < 5) {
                    return (
                      <div
                        // in={value === index}
                        role="tabpanel"
                        hidden={value !== index}
                        id={`vertical-tabpanel-${index}`}
                        aria-labelledby={`vertical-tab-${index}`}
                        style={{
                          width: '20rem',
                          overflowY: 'scroll',
                          maxHeight: '100%',
                        }}
                        key={index + 777}
                      >
                        <TabPanelItem
                          notices={item.data.notices}
                          refusal={item.data.refusal}
                        ></TabPanelItem>
                      </div>
                    );
                  }
                  return null;
                })
              : null}
            {/* {events || events.length < 0
              ? events.map((item, index) => {
                  if (index < 5) {
                    const newestmiles = parseFloat(item.data.mileage);
                    const milesbefore = events[index + 1]
                      ? parseFloat(events[index + 1].data.mileage)
                      : 0;
                    let mileage =
                      milesbefore === 0
                        ? 'First MOT'
                        : newestmiles - milesbefore;
                    return (
                      <MotEvent
                        item={item}
                        driven={mileage}
                        key={Math.random()}
                        index={index}
                        handleClick={() => setChildOpen(!childMotEvenOpen)}
                      />
                    );
                  }
                  return null;
                })
              : null} */}
          </Paper>
        </ClickAwayListener>
      </Popper>
      {/* <Popover
            id={id}
            open={expanded}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{ style: { overflow: 'visible' } }}
          >
            {events || events.length < 0
              ? events.map((item, index) => {
                  if (index < 5) {
                    const newestmiles = parseFloat(item.data.mileage);
                    const milesbefore = events[index + 1]
                      ? parseFloat(events[index + 1].data.mileage)
                      : 0;
                    let mileage =
                      milesbefore === 0
                        ? 'First MOT'
                        : newestmiles - milesbefore;
                    return (
                      <MotEvent
                        item={item}
                        driven={mileage}
                        key={Math.random()}
                        index={index}
                      />
                    );
                  }
                  return null;
                })
              : null}
          </Popover>    */}
    </>
  );
}
