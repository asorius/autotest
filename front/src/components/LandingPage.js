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
import AppBar from '@material-ui/core/AppBar';
import HideOnScroll from './secondary/HideOnScroll';
import Link from '@material-ui/core/Link';
import Settings from './Settings';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
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
  }, [context.list]);

  useEffect(() => {
    localStorage.setItem(
      'atpsettings',
      JSON.stringify({
        postcode: context.postcode,
        settings: context.settings,
      })
    );
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [context.settings, context.postcode]);

  const shareList = (e) => {
    e.preventDefault();
    const urls = context.list.reduce(
      (accumulator, current) => [...accumulator, current.actualLink],
      []
    );
    const data = { key: context.sharekey, list: urls };
    context.saveCarList(data);
  };

  return (
    <Container>
      <Toolbar id="back-to-top-anchor" style={{ position: 'absolute' }} />
      <HideOnScroll>
        <AppBar>
          <Toolbar
            style={{
              width: '80%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">
              <Link href="#back-to-top-anchor" variant="h5" color="textPrimary">
                AutoPare
              </Link>
            </Typography>
            <Settings />
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Grid
        container
        style={{ height: '100vh', marginBottom: '2rem' }}
        spacing={4}
      >
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
            <Typography variant="h1" component="h1" gutterBottom>
              Autopare
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
          <section className="columns is-multiline is-paddingless">
            {context.list.map((item) => {
              return (
                <Car key={item._id} item={item} reload={context.postcode} />
              );
            })}
          </section>
        </main>
        <footer className="footer">
          <div className="contect has-text-centered">
            {context.sharekey !== null ? null : (
              <button className="button" onClick={shareList}>
                Generate sharable link
              </button>
            )}
            {context.sharekey !== null ? (
              <input
                className="input sharelink"
                type="text"
                readOnly
                value={`${window.location.href}${context.sharekey}`}
              />
            ) : null}
          </div>
        </footer>
        <ScrollToTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollToTop>
      </Container>
    </Container>
  );
}
