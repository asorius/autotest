import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import CompareItem from './CompareItem';
import Settings from './Settings';
import classnames from 'classnames';
import { setTimeout } from 'timers';

export default function SharedPage(props) {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setPostLoading] = useState(false);
  const [mode] = useState(props.match.params.key);
  const context = useContext(Context);

  const onChange = e => {
    setUrl(e.target.value.toLowerCase());
  };

  const build = async el => {
    await context.addCarToList({ url: el, settings: context.settings });
  };
  const getlist = async id => {
    let list = await context.getCarList(id);
    if (list === null) {
      window.location.href = '/';
    }
    const existingList = context.list.reduce(
      (acc, el) => [...acc, el.actualLink],
      []
    );
    list.forEach(el => {
      if (existingList.indexOf(el) < 0) {
        build(el);
      }
    });
    localStorage.setItem(
      `SL${id}`,
      JSON.stringify({
        list: context.list
      })
    );
  };
  //on initial page renger, if key is present, send graphql req to retrieve list by key from db and addcar by each list el
  useEffect(() => {
    const key = props.match.params.key;
    if (key) {
      getlist(key);
    }
  }, []);
  useEffect(() => {
    //if check for mode, if anythign else but undefined, it means its on shared page, so udate db on all context.list changes
    const urls = context.list.reduce(
      (accumulator, current) => [...accumulator, current.actualLink],
      []
    );
    const data = { key: `"${mode}"`, list: urls };
    context.saveCarList(data);
    //update localstorage with new list
    localStorage.setItem(
      `SL${mode}`,
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

  const redirectPrivate = e => {
    e.preventDefault();
    window.location.href = '/';
  };
  const deleteList = e => {
    e.preventDefault();
    context.deleteList(mode).then(res => {
      if (res === 'success') {
        localStorage.removeItem(`SL${mode}`);
        window.location.href = '/';
      } else {
        alert('Deletion failed...');
      }
    });
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
        <div className="container">
          <div className="message has-text-centered">
            <div className="message-body">
              <p>
                This is a shared list. Shared lists are automatically updated on
                every addition or deletion. Everyone who has this link can
                freely edit and share current list
              </p>
              <button
                className="button has-background-success"
                onClick={redirectPrivate}
              >
                <span className="icon is-large has-text-white">
                  <i className="fas fa-arrow-circle-left fa-lg" />
                </span>
                <span>Back to Your private list</span>
              </button>
            </div>
          </div>
        </div>
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
        <div className="container has-text-centered">
          <button className="button is-danger delete-btn" onClick={deleteList}>
            Delete the list
          </button>
        </div>
      </footer>
    </div>
  );
}
