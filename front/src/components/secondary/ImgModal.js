import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSpring, animated } from 'react-spring';

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
    border: 'none',
    justifyContent: 'center',
  },
  modalContent: {
    maxWidth: '90%',
    height: '90%',
    position: 'relative',
    // border: 'none',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    // maxHeight: '80vh',
  },

  buttonPrev: {
    position: 'absolute',
    top: '50%',
    left: '5%',
    background: 'black',
  },
  buttonNext: {
    position: 'absolute',
    top: '50%',
    right: '5%',
    background: 'black',
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
    <animated.div style={useSpring({ opacity: 1, from: { opacity: 0 } })}>
      <IconButton onClick={openModal}>
        <ZoomOutMapIcon></ZoomOutMapIcon>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={openModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <div className={classes.modalContent}>
            <Grid container style={{ height: '100%' }}>
              <Grid item style={{ height: '100%' }}>
                <IconButton
                  variant="contained"
                  color="secondary"
                  className={classes.buttonPrev}
                  onClick={changeImgDec}
                >
                  <ArrowBackIosIcon></ArrowBackIosIcon>
                </IconButton>
                <Fade in={images[current - 1] !== images[current]}>
                  <img className={classes.img} src={img} alt="Car" />
                </Fade>
                <IconButton
                  variant="contained"
                  color="secondary"
                  className={classes.buttonNext}
                  onClick={changeImgInc}
                >
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </IconButton>
              </Grid>
              <Grid
                item
                container
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                }}
              >
                <Grid item sm={12} style={{ textAlign: 'center' }}>
                  <Typography variant="h6">
                    {current + 1} / {images.length}
                  </Typography>
                  {/* working hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}
                </Grid>
                <Grid item sm={12}>
                  {images.map((src, i) => (
                    <div
                      style={{
                        height: '4rem',
                        width: '4rem',
                        margin: '.2rem',
                        borderRadius: '5%',
                        display: 'inline-block',
                        border: `${src === img ? '2px solid white' : 'none'}`,
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
    </animated.div>
  );
}
