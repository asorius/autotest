import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import CompareItem from './CompareItem';
import Settings from './Settings';
import classnames from 'classnames';
import { setTimeout } from 'timers';

export default function LandingPage(props) {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setPostLoading] = useState(false);
  const context = useContext(Context);

  const onChange = e => {
    setUrl(e.target.value.toLowerCase());
  };

  useEffect(() => {
    //put list to context on initial render
    localStorage.setItem(
      'atplist',
      JSON.stringify({
        list: context.list
      })
    );
  }, [context.list]);

  useEffect(() => {
    localStorage.setItem(
      'atpsettings',
      JSON.stringify({
        postcode: context.postcode,
        settings: context.settings
      })
    );
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [context.settings, context.postcode]);

  const onPost = e => {
    setPost(
      e.target.value
        .toUpperCase()
        .trim()
        .replace(/\s+/g, '')
    );
  };

  const addCarFunc = async e => {
    setLoading(!loading);
    e.preventDefault();
    try {
      await context.addCarToList({ url, settings: context.settings });

      setLoading(false);
      setUrl('');
    } catch (e) {
      return { errored: e };
    }
  };
  const addPost = async e => {
    setPostLoading(!loadingPost);
    e.preventDefault();
    if (post.length < 4) {
      context.setError({ msg: 'Invalid postcode', to: 'post' });
      setTimeout(() => {
        setPost('');
        setPostLoading(false);
      }, 500);
      return;
    }
    try {
      await context.addPostToList(post);
      const urls = context.list.map(el => el.actualLink);
      context.list.forEach(element => {
        context.removeCarFromList(element._id);
      });
      context.updateListWithNewSettings({
        urls,
        newSettings: context.settings
      });
      setTimeout(() => {
        setPost('');
        setPostLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
    }
  };
  const onDeletePostcode = e => {
    e.preventDefault();

    context.removePostFromList(context.postcode.postcode);
    const urls = context.list.map(el => el.actualLink);
    context.list.forEach(element => {
      context.removeCarFromList(element._id);
    });
    context.updateListWithNewSettings({ urls, newSettings: context.settings });
  };
  const shareList = e => {
    e.preventDefault();
    const urls = context.list.reduce(
      (accumulator, current) => [...accumulator, current.actualLink],
      []
    );
    const data = { key: context.sharekey, list: urls };
    context.saveCarList(data);
  };

  return (
    <div className="main-container">
      <header className="hero is-medium is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">AutoPare</h1>
            <h2 className="subtitle">Expanded AutoTrader car lists</h2>
          </div>
        </div>
      </header>
      <main>
        <section className="section inputs-container container">
          <form className="control postcode " onSubmit={addPost}>
            <div className="center">
              <input
                className="input is-rounded"
                type="text"
                onChange={onPost}
                value={post}
                placeholder="Your postcode"
              />
              <button
                className={classnames('button ', {
                  'is-loading': loadingPost,
                  'is-danger': context.errors.to === 'post'
                })}
                type="submit"
              >
                <span className="icon is-large">
                  <i className="fas fa-search fa-lg" />
                </span>
              </button>
            </div>
            <div className="post-info">
              {context.postcode ? (
                <React.Fragment>
                  <div className="tag is-light ">
                    Current postcode : {context.postcode.postcode}
                  </div>
                  <button
                    className="delete is-medium"
                    onClick={onDeletePostcode}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div
                    className={classnames('tag is-light is-fullwidth', {
                      'is-danger': context.errors.to === 'post'
                    })}
                  >
                    {context.errors.to === 'post'
                      ? context.errors.msg
                      : 'Enter postcode to get directions from You to the car!'}
                  </div>
                </React.Fragment>
              )}
            </div>
          </form>
          <form className="control urlinput" onSubmit={addCarFunc}>
            <input
              className="input"
              type="text"
              value={url}
              onChange={onChange}
              placeholder="Paste links from AutoTrader to add to the list"
            />
            <button
              className={classnames('button is-info is-fullwidth', {
                'is-loading': loading,
                'is-danger': context.errors.to === 'add'
              })}
              type="submit"
            >
              {context.errors.to === 'add' ? `${context.errors.msg} !` : 'Add'}
            </button>
          </form>
          <Settings />
        </section>
        <section className="columns is-multiline is-paddingless">
          {context.list.map(item => {
            return (
              <CompareItem
                key={item._id}
                item={item}
                reload={context.postcode}
              />
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
    </div>
  );
}
