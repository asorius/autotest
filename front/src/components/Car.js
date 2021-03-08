import React, { useContext, useState } from 'react';
import MotEvent from './secondary/MotEvent';
import Context from '../context/context';
import Map from './secondary/Map';
import ImgModal from './secondary/ImgModal';
import ChartItem from './secondary/ChartItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { Chip, Divider, Popover, Tooltip, Fade } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ErrorIcon from '@material-ui/icons/Error';
// import { Link } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  title: {
    padding: '.2rem',
    color: '#5c6bc0',
    width: '100%',
    textAlign: 'center',
  },

  media: {
    height: '100%',
  },
  expand: {
    transform: 'rotate(45deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));
export default function Car(props) {
  const {
    title,
    price,
    images,
    events,
    seller,
    _id,
    map,
    actualLink,
    url,
    addedDate,
    dealerLink,
    mileageDataForDisplay,
    ...rest
  } = props.item;
  const classes = useStyles();
  const context = useContext(Context);
  const [miles, showMiles] = useState(false);
  const [current, setCurrentImg] = useState(0);
  const [img, setImg] = useState(images[current]);
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [visible, setVisibility] = useState(true);
  const [anchorElMiles, setAnchorElMiles] = React.useState(null);

  const handleExpandClick = (e) => {
    setExpanded(!expanded);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setExpanded(!expanded);
  };
  const handleCloseMiles = () => {
    setAnchorElMiles(null);
    showMiles(!miles);
  };

  const removeCar = (e) => {
    e.preventDefault();
    setVisibility(!visible);
    setTimeout(() => {
      context.removeCarFromList(props.item._id);
    }, 200);
  };

  let seller_coords;
  if (map === undefined || map.lat === null || map.lng === null) {
    seller_coords = null;
  } else {
    seller_coords = {
      lat: map.lat,
      lng: map.lng,
    };
  }
  const id = expanded ? 'simple-popover' : undefined;
  const idMiles = miles ? 'simple-popover' : undefined;
  return (
    <Fade in={visible}>
      <Card className={classes.root}>
        <Grid container>
          <Grid item sm={4} container>
            {/* photos */}

            <Grid item sm={12} style={{ position: 'relative' }}>
              <CardMedia className={classes.media} image={img} />

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 4,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ImgModal images={images} current={current} />
              </div>
            </Grid>
          </Grid>

          <Grid item sm={8}>
            {/* main info  */}
            <Grid item sm={12}>
              <CardHeader
                className={classes.title}
                title={`${title} | ${price}`}
                subheader={`MOT: ${
                  events.length > 0 ? events[0].data.expiredate : 'N/A'
                }`}
              />
            </Grid>
            <Divider></Divider>

            <CardContent>
              <List aria-label="main information">
                <Grid container>
                  {Object.entries(rest).map((el, i) => {
                    //rest is our options sent back from the server, like ['acceleration','fast']
                    //loops through user-set options stored in context to get full definition,matches them with according values from data from the server and returns li
                    let name = context.options.filter(
                      (opt) => opt.value === el[0]
                    )[0].name;
                    let classname = context.options.filter(
                      (opt) => opt.value === el[0]
                    )[0].value;
                    return (
                      <Grid item sm={6} key={i + 999}>
                        <ListItemText
                          className={classname}
                          key={Math.random()}
                          style={{ padding: 0, textAlign: 'center' }}
                        >
                          <ListItemText
                            primary={
                              el[1] === false || el[1] === null || false
                                ? 'Unavailable'
                                : el[1]
                            }
                            secondary={name}
                          />
                        </ListItemText>
                      </Grid>
                    );
                  })}
                </Grid>
              </List>
            </CardContent>
            <Divider></Divider>
          </Grid>
          <Grid item sm={12}>
            <Grid
              style={{
                padding: '.75rem ',
              }}
              container
              spacing={1}
              justify="space-evenly"
            >
              <Grid item sm={8}>
                {dealerLink ? (
                  <React.Fragment>
                    <Typography
                      variant="h5"
                      color="secondary"
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      <Tooltip title="Sellers website" aria-label="seller">
                        <a
                          href={dealerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {seller.name}
                        </a>
                      </Tooltip>
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {seller.name}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  style={{ padding: '.5rem', textAlign: 'center' }}
                >
                  {seller.phone1}
                  {seller.phone2 ? `, ${seller.phone2}` : null}
                </Typography>
              </Grid>
              <Grid item sm={4} style={{ textAlign: 'center' }}>
                <Chip
                  style={{ margin: '.5rem' }}
                  size="small"
                  variant="outlined"
                  label={
                    addedDate
                      ? `Published : ${addedDate.substring(
                          0,
                          4
                        )}-${addedDate.substring(4, 6)}-${addedDate.substring(
                          6,
                          8
                        )}`
                      : null
                  }
                ></Chip>
                <Tooltip title="View original add" aria-label="view link">
                  <Button size="small" variant="outlined" color="secondary">
                    <a
                      href={`${actualLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Autotrader
                    </a>
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
            <Divider></Divider>
          </Grid>

          <Grid item sm={12}>
            {seller_coords ? (
              <Map
                usercoords={context.postcode ? context.postcode : null}
                sellercoords={seller_coords}
                isMarkerShown={true}
              />
            ) : map === undefined ? null : (
              <Chip
                variant="outlined"
                size="small"
                icon={<ErrorIcon style={{ color: 'darkred' }} />}
                label="Map unavailable due to seller"
              />
            )}
          </Grid>
        </Grid>

        <CardActions
          disableSpacing
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            aria-describedby={id}
            color="primary"
            variant="contained"
            onClick={handleExpandClick}
            aria-label="show more"
          >
            MOT history
            {expanded ? <ExpandMore /> : <ExpandLess />}
          </Button>
          <Popover
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
          </Popover>

          <Button
            aria-describedby={idMiles}
            color="secondary"
            variant="contained"
            onClick={(e) => {
              showMiles(!miles);
              setAnchorElMiles(e.currentTarget);
            }}
            aria-label="show miles"
          >
            Mileage history
            {miles ? <ExpandMore /> : <ExpandLess />}
          </Button>
          <Popover
            id={idMiles}
            open={miles}
            anchorEl={anchorElMiles}
            onClose={handleCloseMiles}
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
            {miles ? (
              <ChartItem mileages={mileageDataForDisplay}></ChartItem>
            ) : (
              'Not Available'
            )}
          </Popover>

          <Tooltip title="Remove car" aria-label="remove">
            <IconButton onClick={removeCar} style={{ color: 'red' }}>
              <DeleteForeverIcon
                size="large"
                style={{ fontSize: '2rem' }}
              ></DeleteForeverIcon>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Fade>
    // <div className="column is-paddingless  is-half-tablet  is-one-third-widescreen is-one-third-fullhd">
    //   <div className="card">
    //     <div className="card-image">
    //       <figure className="image ">
    //         <img src={img} alt="Car" />
    //       </figure>
    //       <div className="buttons">
    //         <button className="button prev" onClick={changeImg}>
    //           <span className="icon is-small prev">
    //             <i className="fas fa-angle-left prev" />
    //           </span>
    //         </button>
    //         <ImgModal
    //           images={images}
    //           current={current}
    //           smallImgChange={changeImg}
    //         />
    //         <div className="current">
    //           <span className="txt">
    //             {current + 1} / {images.length}
    //           </span>
    //         </div>
    //         <button className="button next" onClick={changeImg}>
    //           <span className="icon is-small next">
    //             <i className="fas fa-angle-right next" />
    //           </span>
    //         </button>
    //       </div>
    //     </div>
    //     <div className="card-content">
    //       <h2 className="title is-size-3 car-title">{title}</h2>
    //       <div className="subs">
    //         <h2 className="subtitle1 is-size-4">{price}</h2>
    //         <h3 className="subtitle2">
    //           <strong>
    //             <i>MOT</i>
    //           </strong>{' '}
    //           : {events.length > 0 ? events[0].data.expiredate : null}
    //         </h3>
    //       </div>
    //     </div>
    //     <div className="content ">
    //       <div
    //         className={classnames('c media', {
    //           ' is-invisible': listEntries,
    //         })}
    //       >
    //         <div className="div media-left has-text-success">
    //           <span className="icon is-large">
    //             <i className="fas fa-car fa-lg" />
    //           </span>
    //         </div>
    //         <div className="media-content">
    //           {Object.entries(rest).map((el) => {
    //             //rest is our options sent back from the server, like ['acceleration','fast']
    //             //loops through user-set options stored in context to get full definition,matches them with according values from data from the server and returns li
    //             let name = context.options.filter(
    //               (opt) => opt.value === el[0]
    //             )[0].name;
    //             let classname = context.options.filter(
    //               (opt) => opt.value === el[0]
    //             )[0].value;
    //             return (
    //               <li
    //                 className={classname}
    //                 key={Math.random()}
    //                 onMouseEnter={sethover}
    //                 onMouseLeave={unsethover}
    //               >
    //                 <strong>{name}</strong> :{' '}
    //                 {el[1] === false || el[1] === null || false
    //                   ? 'Unavailable'
    //                   : el[1]}
    //               </li>
    //             );
    //           })}
    //         </div>
    //       </div>
    //       <div className="seller media">
    //         <div className="media-left has-text-warning">
    //           <span className="icon is-large">
    //             <i className="fas fa-money-check-alt fa-lg" />
    //           </span>
    //         </div>
    //         <div className="media-content">
    //           {dealerLink ? (
    //             <strong>
    //               <a
    //                 className="at-link"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 href={dealerLink}
    //               >
    //                 {seller.name}
    //               </a>
    //             </strong>
    //           ) : (
    //             <strong>{seller.name}</strong>
    //           )}
    //           <br />
    //           <strong>Contacts</strong> : {seller.phone1}
    //           {seller.phone2 ? `, ${seller.phone2}` : null}
    //           {addedDate ? (
    //             <React.Fragment>
    //               <br />
    //               <strong>Advert added : </strong>
    //               {addedDate.substring(0, 4)} {addedDate.substring(4, 6)}{' '}
    //               {addedDate.substring(6, 8)}
    //             </React.Fragment>
    //           ) : null}
    //         </div>
    //       </div>
    //       <div className="div">
    //         {seller_coords ? (
    //           <Map
    //             usercoords={context.postcode ? context.postcode : null}
    //             sellercoords={seller_coords}
    //             isMarkerShown={true}
    //           />
    //         ) : map === undefined ? null : (
    //           <div className="center">
    //             <p>
    //               <i>Map unavailable due to seller.</i>
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div className="content" style={{ textAlign: 'center' }}>
    //       <button
    //         className="button "
    //         onClick={() => {
    //           showMiles(!miles);
    //         }}
    //       >
    //         {miles ? 'Hide' : 'Show'} available mileage history
    //       </button>

    //       {miles ? (
    //         <ChartItem mileages={mileageDataForDisplay}></ChartItem>
    //       ) : null}
    //     </div>
    //     <div className="card-footer">
    //       <div
    //         className={classnames('dropdown is-up ', {
    //           'is-active': drop,
    //         })}
    //       >
    //         <div className="dropdown-trigger">
    //           <button
    //             onClick={toggleDrop}
    //             className="button"
    //             aria-haspopup="true"
    //             aria-controls="dropdown-menu1"
    //           >
    //             <span>MOT history</span>
    //             <span className="icon is-small main-arrow">
    //               <i className="fas fa-angle-up" aria-hidden="true" />
    //             </span>
    //           </button>
    //         </div>
    //         <div
    //           className="dropdown-menu menu-container"
    //           id="dropdown-menu1"
    //           role="menu"
    //         >
    //           <div className="dropdown-content">
    //             {events || events.length < 0
    //               ? events.map((item, index) => {
    //                   if (index < 5) {
    //                     const newestmiles = parseFloat(item.data.mileage);
    //                     const milesbefore = events[index + 1]
    //                       ? parseFloat(events[index + 1].data.mileage)
    //                       : 0;
    //                     let mileage =
    //                       milesbefore === 0
    //                         ? 'First MOT'
    //                         : newestmiles - milesbefore;

    //                     return (
    //                       <MotEvent
    //                         item={item}
    //                         driven={mileage}
    //                         key={Math.random()}
    //                         index={index}
    //                       />
    //                     );
    //                   }
    //                   return null;
    //                 })
    //               : null}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="center">
    //         <a
    //           className="at-link"
    //           href={`${actualLink}`}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           View on AutoTrader
    //         </a>
    //       </div>
    //       <div>
    //         <button className="delete is-large " onClick={removeCar} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
