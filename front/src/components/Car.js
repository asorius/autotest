import React, { useContext, useState } from 'react';
import Context from '../context/context';
import Map from './secondary/Map';
import ImgModal from './secondary/ImgModal';
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
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SettingsIcon from '@material-ui/icons/Settings';
import { Translate } from '@material-ui/icons';

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
          <Grid
            item
            sm={4}
            className="photosContainer"
            style={{ position: 'relative', minHeight: '10rem', width: '100%' }}
          >
            {/* photos */}
            {/* LEFT HERE TO ADD LOADER WHILE IMAGE IS BEING LOADED */}
            <CardMedia
              className={classes.media}
              image={images[0]}
              alias="Car photo"
            />

            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Chip
                label={price}
                color="secondary"
                style={{
                  position: 'absolute',
                  transform: 'translateX(20px)',
                  bottom: 4,
                  right: 0,
                  fontSize: '1.2rem',
                }}
              ></Chip>
              <ImgModal images={images} current={0} />
            </div>
          </Grid>

          <Grid item sm={8} style={{ position: 'relative', padding: 0 }}>
            {/* main info  */}
            <Grid item sm={12} style={{ background: ' #f7f7f7' }}>
              <CardHeader
                className={classes.title}
                title={<Typography variant="h6">{title}</Typography>}
                subheader={
                  <Typography variant="subtitle2" color="textSecondary">
                    MOT: {events.length > 0 ? events[0].data.expiredate : 'N/A'}
                  </Typography>
                }
              />
            </Grid>
            <Divider></Divider>

            <CardContent>
              <List aria-label="main information" style={{ padding: 0 }}>
                <Grid container spacing={0} justify="space-around">
                  {userSelectedOptions.length > 0 ? (
                    userSelectedOptions.map((el, i) => {
                      let desiredOptionName = el;
                      if (desiredOptionName.includes('map')) {
                        return null;
                      }
                      let desiredOptionNameValue = rest[el] ?? 'Unavailable';

                      return (
                        <Grid item xs={3} sm={6} key={i + 999}>
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
                    })
                  ) : (
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="caption"
                      style={{
                        padding: '2rem',
                        display: 'grid',
                        alignContent: 'center',
                      }}
                    >
                      Click
                      <SettingsIcon
                        style={{ margin: '0 auto', position: 'inline-block' }}
                      />
                      icon at the bottom to choose what you want to see about
                      the car.
                    </Typography>
                  )}
                </Grid>
              </List>
            </CardContent>
            <Divider></Divider>
          </Grid>
          <Grid
            item
            sm={12}
            style={{ position: 'relative', background: ' #f7f7f7' }}
          >
            <Grid
              style={{
                padding: '.75rem ',
                position: 'relative',
              }}
              container
              justify="space-evenly"
            >
              <Grid item sm={12}>
                {dealerLink ? (
                  <React.Fragment>
                    <Typography
                      variant="h6"
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
                          <OpenInNewIcon
                            style={{ fontSize: '.8rem', marginLeft: '.5rem' }}
                          ></OpenInNewIcon>
                        </a>
                      </Tooltip>
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {seller.name}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  style={{ padding: '.5rem', textAlign: 'center' }}
                >
                  {seller.phone1}
                  {seller.phone2 && seller.phone1
                    ? `, ${seller.phone2}`
                    : seller.phone2
                    ? `${seller.phone2}`
                    : null}
                </Typography>
                <Chip
                  variant="outlined"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translate(-50%,50%)',
                    background: 'white',
                  }}
                  size="small"
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
              </Grid>
            </Grid>
            <Divider></Divider>
          </Grid>

          <Grid item sm={12} style={{ textAlign: 'center' }}>
            {userSelectedOptions.length > 0 ? (
              userSelectedOptions.includes('map') ? (
                seller_coords.lat ? (
                  <Map
                    usercoords={user_coords ? user_coords : null}
                    sellercoords={seller_coords}
                    isMarkerShown={true}
                    sellerName={seller.name}
                  />
                ) : map === undefined ? null : (
                  <Chip
                    variant="outlined"
                    size="small"
                    icon={<ErrorIcon style={{ color: 'darkred' }} />}
                    label="Map unavailable due to seller"
                    style={{ margin: '1rem auto', padding: '1rem' }}
                  />
                )
              ) : null
            ) : null}
          </Grid>
        </Grid>

        <CardActions
          disableSpacing
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <MotHistory events={events}></MotHistory>
          <HistoryChart
            miles={miles}
            mileageDataForDisplay={mileageDataForDisplay}
          ></HistoryChart>
          <Tooltip title="Open on Autotrader" aria-label="remove">
            <IconButton
              href={`${actualLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OpenInNewIcon color="primary"></OpenInNewIcon>
            </IconButton>
          </Tooltip>
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
