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
  const context = useContext(Context);

  const onChange = e => {
    setUrl(e.target.value.toLowerCase());
  };

  useEffect(() => {
    localStorage.setItem(
      'atpdata',
      JSON.stringify({
        list: context.list,
        postcode: context.postcode,
        settings: context.settings
      })
    );
  }, [context.settings, context.list]);

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
        <section className="section container">
          <form className="control postcode center" onSubmit={addPost}>
            <input
              className="input is-rounded"
              type="text"
              onChange={onPost}
              value={post}
              placeholder="Your postcode"
            />
            <button
              className={classnames('button ', {
                'is-loading': loadingPost
              })}
              type="submit"
            >
              Find
            </button>
            {context.postcode.length > 0 ? (
              <div className="tag is-light is-fullwidth">
                Current postcode:{context.postcode[0].postcode}
              </div>
            ) : (
              <div className="tag is-light is-fullwidth">
                Enter postcode to instantly get directions from you to the car!
              </div>
            )}
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
                'is-loading': loading
              })}
              type="submit"
            >
              Add
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
    </React.Fragment>
  );
}
