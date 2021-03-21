import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import InputFormsContainer from './InputFormsContainer';
import { setTimeout } from 'timers';
import Toolbar from '@material-ui/core/Toolbar';
import ScrollToTop from './secondary/ScrollToTop';
import Container from '@material-ui/core/Container';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import bg from '../utils/bm.jpg';
import Grid from '@material-ui/core/Grid';
import Settings from './Settings';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { Grow } from '@material-ui/core';
import Loader from './secondary/Loader';
import CarCardsList from './secondary/CarCardsList';

// import { useSpring, animated } from 'react-spring';

export default function LandingPage(props) {
  const context = useContext(Context);
  const [loading, setLoading] = useState(false);
  const listRef = React.useRef(null);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 2000);
    }
  }, [loading]);
  useEffect(() => {
    setLoading(true);
    if (context.list.length > 0) {
      listRef.current.scrollIntoView(true);
    }
  }, [context.list.length, context.settings.length]);
  return (
    <div style={{ background: '#ebebeb', width: '100%', height: '100%' }}>
      <div style={{ background: 'white', width: '100%', height: '100%' }}>
        <Container>
          <Toolbar id="back-to-top-anchor" style={{ position: 'absolute' }} />
          <Grid container style={{ height: '100vh', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '35%',
                right: '35%',
                height: '5rem',
                width: '8rem',
                zIndex: '-20',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235c6bc0' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <Grid item md={6}>
              <Hidden smDown>
                <header
                  style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '100vh',
                    clipPath:
                      'polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)',
                  }}
                ></header>
              </Hidden>
            </Grid>
            <Grid item sm={12} md={6}>
              <Container
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  height: '50%',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  color="textPrimary"
                >
                  AutoPare
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  color="textSecondary"
                >
                  Learn more about Your future investment!
                </Typography>
                <Divider></Divider>
              </Container>
              <InputFormsContainer></InputFormsContainer>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container>
        <main>
          <section
            ref={listRef}
            style={{
              position: 'relative',
              padding: context.list.length > 0 ? '2rem' : 0,
            }}
            id="list"
          >
            {loading ? <Loader></Loader> : null}

            <Grow in={!loading}>
              <Grid container spacing={2}>
                <CarCardsList></CarCardsList>
              </Grid>
            </Grow>
          </section>
        </main>
        <ScrollToTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollToTop>

        <Settings />
      </Container>
    </div>
  );
}
