import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ChevronLeft';
import ArrowForwardIosIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
// import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1212,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    height: '90%',
    position: 'relative',
    background: 'black',
  },
  img: {
    maxHeight: '100%',
    margin: '0 auto',
    // width: '100%',
    objectFit: 'cover',
    display: 'block',
    // maxHeight: '80vh',
  },

  buttonPrev: {
    position: 'absolute',
    top: '50%',
    left: '5%',
    height: '5rem',
    width: '5rem',
    background: '#ffffffd1',
  },
  buttonNext: {
    position: 'absolute',
    top: '50%',
    height: '5rem',
    width: '5rem',
    right: '5%',
    background: '#ffffffd1',
  },
}));
export default function ImgModal({
  images,
  current: currentImg,
  smallImgChange,
}) {
  const [modal, setModal] = useState(false);
  const [current, incrementImg] = useState(currentImg);
  const [img, setImg] = useState(images[currentImg]);
  const openModal = (e) => {
    incrementImg(currentImg);
    setImg(images[currentImg]);
    setModal(!modal);
  };
  const classes = useStyles();
  const changeImgInc = (e) => {
    e.preventDefault();

    if (current + 1 <= images.length - 1) {
      setImg(images[current + 1]);
      incrementImg(current + 1);
    } else {
      setImg(images[0]);
      incrementImg(0);
    }
  };
  const changeImgDec = (e) => {
    if (current - 1 >= 0) {
      setImg(images[current - 1]);
      incrementImg(current - 1);
    } else {
      setImg(images[images.length - 1]);
      incrementImg(images.length - 1);
    }

    // smallImgChange(e, current);
  };
  return (
    <div
      style={{ height: '100%', width: '100%', zIndex: 55, cursor: 'pointer' }}
    >
      <Tooltip
        title="Enlarge photo"
        aria-label="enlarge"
        style={{ height: '50%', width: '50%' }}
      >
        <Button
          id="openingDiv"
          onClick={openModal}
          style={{ height: '100%', width: '100%' }}
        ></Button>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={modal}>
          <div className={classes.modalContent}>
            <Grid container style={{ height: '100%' }}>
              <Grid item style={{ height: '100%', width: '100%' }}>
                <Tooltip title="Previous" aria-label="prev">
                  <IconButton
                    variant="contained"
                    color="secondary"
                    className={classes.buttonPrev}
                    onClick={changeImgDec}
                  >
                    <ArrowBackIosIcon size="large"></ArrowBackIosIcon>
                  </IconButton>
                </Tooltip>

                <img className={classes.img} src={img} alt="Car" />
                <Tooltip title="Next" aria-label="next">
                  <IconButton
                    variant="contained"
                    color="secondary"
                    className={classes.buttonNext}
                    onClick={changeImgInc}
                  >
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                item
                container
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  maxHeight: '15%',
                  minHeight: '5rem',
                  textAlign: 'center',
                  borderRadius: '.5rem',
                }}
              >
                <Grid item sm={12} style={{ textAlign: 'center' }}>
                  <Typography
                    variant="body1"
                    style={{
                      background: '#26a69a',
                      borderRadius: '.7rem',
                      color: 'white',
                      width: '5rem',
                      marginLeft: '10%',
                      position: 'absolute',
                      top: '-12%',
                      left: '75%',
                    }}
                  >
                    {current + 1} / {images.length}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  {images.map((src, i) => (
                    <div
                      key={i + 565}
                      style={{
                        height: '2rem',
                        width: '2rem',
                        margin: '.2rem',
                        borderRadius: '5%',
                        display: 'inline-block',
                        border: `${src === img ? '2px solid #26a69a' : 'none'}`,
                        background: `url(${src})`,
                        backgroundSize: 'cover',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setImg(src);
                        incrementImg(i);
                      }}
                    ></div>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
