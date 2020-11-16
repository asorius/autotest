import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import Car from './Car';
import InputsForm from './InputsForm';
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
// import AppBar from '@material-ui/core/AppBar';
// import HideOnScroll from './secondary/HideOnScroll';
// import Link from '@material-ui/core/Link';
import Settings from './Settings';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function LandingPage(props) {
  const context = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //put list to context on initial render
    localStorage.setItem(
      'atplist',
      JSON.stringify({
        list: context.list,
      })
    );
    localStorage.setItem(
      'atpsettings',
      JSON.stringify({
        postcode: context.postcode,
        settings: context.settings,
      })
    );
    if (context.list.length > 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [context.list, context.postcode, context.settings]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     'atpsettings',
  //     JSON.stringify({
  //       postcode: context.postcode,
  //       settings: context.settings,
  //     })
  //   );
  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 1500);
  // }, [context.settings, context.postcode]);

  return (
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
                clipPath: 'polygon(0% 0%, 88% 0, 100% 50%, 88% 100%, 0% 100%)',
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
          <InputsForm></InputsForm>
        </Grid>
      </Grid>
      <Container>
        <main>
          <section
            className="columns is-multiline is-paddingless"
            style={{ position: 'relative', padding: '2rem' }}
            id="list"
          >
            {loading ? (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  height: '100%',
                  width: '100%',
                  minHeight: '10rem',
                  zIndex: '2',
                  background: '#ffffffde',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '5rem',
                }}
              >
                <CircularProgress size={150} thickness={5} />
                <Typography variant="h4" style={{ margin: '2rem' }}>
                  Updating list...
                </Typography>
              </div>
            ) : null}
            {context.list.map((item) => {
              return (
                <Car key={item._id} item={item} reload={context.postcode} />
              );
            })}
          </section>
        </main>
        <ScrollToTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollToTop>

        <Settings />
      </Container>
    </Container>
  );
}
