import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import MotEvent from './secondary/MotEvent';
import Context from '../context/context';
import Map from './secondary/Map';
import ImgModal from './secondary/ImgModal';
import ChartItem from './secondary/ChartItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Chip, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'rgba(255, 255, 255, 0.75)',
    padding: '.2rem',
    color: '#5c6bc0',
    width: '100%',
    textAlign: 'center',
  },
  info: {
    // marginTop: '-5rem',
  },
  media: {
    minHeight: '35rem',
  },
  expand: {
    transform: 'rotate(45deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  collapse: {
    position: 'absolute',
    bottom: '2%',
    padding: '1rem',
    borderRadius: '.5rem',
    left: '15%',
    background: 'rgba(245, 245, 245, 1)',
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
  const [drop, setDrop] = useState(false);
  const [miles, showMiles] = useState(false);
  const list = document.getElementById('list');
  const [current, setCurrentImg] = useState(0);
  const [img, setImg] = useState(images[current]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const changeImg = (e, fromsmall) => {
    e.preventDefault();
    setCurrentImg(fromsmall);
    if (e.target.classList.contains('next')) {
      if (current + 1 <= images.length - 1) {
        setImg(images[current + 1]);
        setCurrentImg(current + 1);
      } else {
        setImg(images[0]);
        setCurrentImg(0);
      }
    }
    if (e.target.classList.contains('prev')) {
      if (current - 1 >= 0) {
        setImg(images[current - 1]);
        setCurrentImg(current - 1);
      } else {
        setImg(images[images.length - 1]);
        setCurrentImg(images.length - 1);
      }
    }
  };
  const toggleDrop = (e) => {
    e.preventDefault();
    setDrop(!drop);
  };
  const removeCar = (e) => {
    e.preventDefault();
    context.removeCarFromList(props.item._id);
    list.scrollIntoView(true);
  };

  const listEntries = Object.entries(rest).length > 0 ? false : true;

  let seller_coords;
  if (map === undefined || map.lat === null || map.lng === null) {
    seller_coords = null;
  } else {
    seller_coords = {
      lat: map.lat,
      lng: map.lng,
    };
  }
  return (
    <Card className={classes.root}>
      <Grid container direction="row">
        <Grid item sm={12} container>
          {/* photos and seller/map */}
          <Grid item sm={12}>
            <CardHeader
              className={classes.title}
              title={`${title} | ${price}`}
              subheader={`MOT: ${
                events.length > 0 ? events[0].data.expiredate : 'N/A'
              }`}
            />
          </Grid>
          <Grid item sm={12}>
            <CardMedia className={classes.media} image={img} />
          </Grid>
          <Grid item sm={12} style={{ height: '2rem' }}>
            <Grid
              style={{
                transform: 'translateY(-60px)',
                zIndex: 2,
                // background: '#26a69a',
                background: 'white',
                borderTopRightRadius: '4rem',
                padding: '1rem ',
              }}
              container
              spacing={0}
            >
              <Grid item sm={4}>
                {dealerLink ? (
                  <Typography variant="h5" color="secondary">
                    <Link
                      to={dealerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {seller.name}
                    </Link>
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    color="secondary"
                    style={{
                      height: '100%',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    {seller.name}
                  </Typography>
                )}
              </Grid>
              <Grid item sm={8} style={{ textAlign: 'center' }}>
                <Typography variant="h6">Contacts</Typography>
                <Typography variant="body2">
                  <Link to={`tel:${seller.phone1}`}>{seller.phone1}</Link>
                  {seller.phone2 ? (
                    <Link to={`tel:${seller.phone2}`}>, {seller.phone2}</Link>
                  ) : null}
                </Typography>
              </Grid>
              <Grid item sm={12} style={{ textAlign: 'center' }}></Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12}>
          {/* main info  */}
          <Divider></Divider>

          <CardContent>
            <List aria-label="main information">
              <Grid container>
                {Object.entries(rest).map((el) => {
                  //rest is our options sent back from the server, like ['acceleration','fast']
                  //loops through user-set options stored in context to get full definition,matches them with according values from data from the server and returns li
                  let name = context.options.filter(
                    (opt) => opt.value === el[0]
                  )[0].name;
                  let classname = context.options.filter(
                    (opt) => opt.value === el[0]
                  )[0].value;
                  return (
                    <Grid item sm={6}>
                      <ListItemText
                        className={classname}
                        key={Math.random()}
                        style={{ padding: 0, textAlign: 'center' }}
                      >
                        <ListItemText
                          primary={name}
                          secondary={
                            el[1] === false || el[1] === null || false
                              ? 'Unavailable'
                              : el[1]
                          }
                        />
                      </ListItemText>
                    </Grid>
                  );
                })}
              </Grid>
            </List>
          </CardContent>
        </Grid>
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <Chip
            style={{ marginBottom: '1rem' }}
            variant="outlined"
            label={
              addedDate
                ? `Added on Autotrader : ${addedDate.substring(
                    0,
                    4
                  )}-${addedDate.substring(4, 6)}-${addedDate.substring(6, 8)}`
                : null
            }
          ></Chip>
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
            <div className="center">
              <p>
                <i>Map unavailable due to seller.</i>
              </p>
            </div>
          )}
        </Grid>
      </Grid>

      <CardActions disableSpacing>
        <Button
          color="primary"
          variant="contained"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          MOT history
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            showMiles(!miles);
          }}
          aria-expanded={miles}
          aria-label="show more"
        >
          Mileage history
        </Button>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        {events || events.length < 0
          ? events.map((item, index) => {
              if (index < 5) {
                const newestmiles = parseFloat(item.data.mileage);
                const milesbefore = events[index + 1]
                  ? parseFloat(events[index + 1].data.mileage)
                  : 0;
                let mileage =
                  milesbefore === 0 ? 'First MOT' : newestmiles - milesbefore;

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
      </Collapse>
      <Collapse
        in={miles}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        {miles ? (
          <ChartItem mileages={mileageDataForDisplay}></ChartItem>
        ) : (
          'Not Available'
        )}
      </Collapse>
    </Card>

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
