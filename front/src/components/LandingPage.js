import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import CompareItem from './CompareItem';
import Settings from './Settings';
import classnames from 'classnames';

export default function LandingPage(props) {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setPostLoading] = useState(false);
  const [mode, setMode] = useState(props.match.params.key);
  const context = useContext(Context);

  const onChange = e => {
    setUrl(e.target.value.toLowerCase());
  };

  const build = async el => {
    await context.addCarToList({ url: el, settings: context.settings });
  };

  //

  //on initial page renger, if key is present, send graphql req to retrieve list by key from db and addcar by each list el
  useEffect(() => {
    const key = props.match.params.key;
    if (key) {
      const existingList = context.list.reduce(
        (acc, el) => [...acc, el.actualLink],
        []
      );
      //if there is already some data in list, in order to avoid readding same list items on top of current, only build components of unmatched items
      context.getCarList(key).then(list => {
        list.forEach(el => {
          if (existingList.indexOf(el) < 0) {
            build(el);
          }
        });
      });
      localStorage.setItem(
        'sharelist',
        JSON.stringify({
          list: context.list
        })
      );
    }
  }, []);
  //

  useEffect(() => {
    //if check for mode, if anythign else but undefined, it means its on shared page, so udate db on all context.list changes
    if (mode !== undefined) {
      const urls = context.list.reduce(
        (accumulator, current) => [...accumulator, current.actualLink],
        []
      );
      console.log({ key: `"${mode}"`, list: urls });
      const data = { key: `"${mode}"`, list: urls };
      context.saveCarList(data);
      localStorage.setItem(
        'sharelist',
        JSON.stringify({
          list: context.list
        })
      );
    } else {
      localStorage.setItem(
        'atplist',
        JSON.stringify({
          list: context.list
        })
      );
    }
  }, [context.list]);

  useEffect(() => {
    localStorage.setItem(
      'atpsettings',
      JSON.stringify({
        postcode: context.postcode,
        settings: context.settings
      })
    );
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
    <React.Fragment>
      <header className="hero is-medium is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">AutoPare</h1>
            <h2 className="subtitle">Expanded AutoTrader car comparing tool</h2>
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
                {context.errors.to === 'post' ? 'Error !' : 'Find'}
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
              placeholder="Paste car link from AutoTrader to add to the list"
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
            return <CompareItem key={item._id} item={item} />;
          })}
        </section>
      </main>
      <footer className="footer">
        <div className="contect has-text-centered">
          <button className="button" onClick={shareList}>
            {context.sharekey !== null
              ? 'Update shared list'
              : 'Share the list'}
          </button>
          {context.sharekey !== null ? (
            <input
              className="input"
              type="text"
              disabled
              value={`${window.location.href}${context.sharekey}`}
            />
          ) : null}
        </div>
      </footer>
    </React.Fragment>
  );
}
