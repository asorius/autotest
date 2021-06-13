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
import { useSpring, animated } from 'react-spring';
export default function MotHistory({ events }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const refButton = React.useRef(null);
  const handleClick = (e) => {
    !anchorEl && setAnchorEl(refButton.current);
    setOpen(!open);
    setExpanded(!expanded);
  };
  const handleChange = (e, newValue) => setValue(newValue);
  const id = open ? 'simple-popper' : undefined;
  const springProps = useSpring({
    to: { opacity: open ? 1 : 0 },
    from: { opacity: 0 },
  });
  console.log(events);
  return (
    <>
      <Button
        aria-describedby={id}
        color="primary"
        variant="contained"
        onClick={handleClick}
        aria-label="show more"
        ref={refButton}
        size="small"
        style={{ textTransform: 'none' }}
        disabled={events.length > 0 ? false : true}
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
            <animated.div style={springProps}>
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
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  {item.date
                                    .split(' ')
                                    .map((el, ind) =>
                                      el.length > 4 ? el.slice(0, 3) : el
                                    )
                                    .join(' ')}
                                  <CheckCircleOutlineIcon
                                    style={{ color: 'green' }}
                                  ></CheckCircleOutlineIcon>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  {item.date
                                    .split(' ')
                                    .map((el, ind) =>
                                      el.length > 4 ? el.slice(0, 3) : el
                                    )
                                    .join(' ')}
                                  <NotInterestedIcon
                                    style={{ color: 'red' }}
                                  ></NotInterestedIcon>
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
            </animated.div>
            <animated.div
              style={useSpring({
                from: { opacity: 0 },
                to: { opacity: open ? 1 : 0 },
                delay: 200,
              })}
            >
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
                            borderLeft: '1px solid #878787bd',
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
            </animated.div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
