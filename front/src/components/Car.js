import React, { useContext, useState } from 'react';
import Context from '../context/context';
import Map from './secondary/Map';
import ImgModal from './secondary/ImgModal';
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
import { Chip, Divider, Tooltip, Fade } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ErrorIcon from '@material-ui/icons/Error';
import MotHistory from './secondary/MotHistory';
import HistoryChart from './secondary/HistoryChart';
// import { Link } from 'react-router-dom';
// import { useSpring, animated } from 'react-spring';
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
  const { options: userSelectedOptions } = props;
  const { usersPostcodeDataFromContext } = props;
  const classes = useStyles();
  const context = useContext(Context);
  const [miles, showMiles] = useState(false);
  const [visible, setVisibility] = useState(true);
  const [seller_coords, setSellerCoords] = useState(false);
  const [user_coords, setUserCoords] = useState(usersPostcodeDataFromContext);
  React.useEffect(() => {
    if (map) {
      setSellerCoords({
        lat: map.lat,
        lng: map.lng,
      });
      setUserCoords(usersPostcodeDataFromContext);
    }
  }, [map, usersPostcodeDataFromContext]);

  const removeCar = (e) => {
    e.preventDefault();
    setVisibility(!visible);
    setTimeout(() => {
      context.removeCarFromList(props.item._id);
    }, 200);
  };
  return (
    <Fade in={visible}>
      <Card className={classes.root}>
        <Grid container>
          <Grid item sm={4} container>
            {/* photos */}

            <Grid item sm={12} style={{ position: 'relative' }}>
              <CardMedia className={classes.media} image={images[0]} />

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  // zIndex: 4,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ImgModal images={images} current={0} />
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
                  {userSelectedOptions.map((el, i) => {
                    let desiredOptionName = el;
                    if (desiredOptionName.includes('map')) {
                      return null;
                    }
                    let desiredOptionNameValue = rest[el] ?? 'Unavailable';

                    return (
                      <Grid item sm={6} key={i + 999}>
                        <ListItemText
                          className={desiredOptionName}
                          key={Math.random()}
                          style={{ padding: 0, textAlign: 'center' }}
                        >
                          <ListItemText
                            primary={desiredOptionNameValue}
                            secondary={desiredOptionName}
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
                  {seller.phone2 && seller.phone1
                    ? `, ${seller.phone2}`
                    : seller.phone2
                    ? `${seller.phone2}`
                    : null}
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
            {userSelectedOptions.includes('map') ? (
              seller_coords.lat ? (
                <Map
                  usercoords={user_coords ? user_coords : null}
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
              )
            ) : null}
          </Grid>
        </Grid>

        <CardActions
          disableSpacing
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <MotHistory events={events}></MotHistory>
          <HistoryChart
            miles={miles}
            mileageDataForDisplay={mileageDataForDisplay}
          ></HistoryChart>
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
  );
}
