import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/context';
import CompareItem from './CompareItem';
import classnames from 'classnames';

export default function LandingPage(props) {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setPostLoading] = useState(false);
  const [settings, addSetting] = useState([]);
  const context = useContext(Context);
  const onChange = e => {
    setUrl(e.target.value.toLowerCase());
  };
  const onPost = e => {
    setPost(
      e.target.value
        .toUpperCase()
        .trim()
        .replace(/\s+/g, '')
    );
  };

  //-----------------------
  const onCheck = e => {
    if (settings.indexOf(e.target.name) < 0) {
      addSetting([...settings, e.target.name]);
    } else {
      const neww = settings.filter(el => el !== e.target.name);
      addSetting([...neww]);
    }
  };
  //----------------
  const addCarFunc = async e => {
    setLoading(!loading);
    e.preventDefault();
    try {
      //---------------------------------------------------------
      const reqbody = {
        query: `
        query {
          getAutodata(url:"${url}"){
            _id
            price
            title
          ${settings.join(' ')}
          }
        }
      `
      };
      const graph = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        }
      });
      const data = await graph.json();
      console.log(data);
      //----------------------------------------------------------------
      await context.addCarToList({ url });
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
    <div>
      <section className="hero is-medium is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">AutoPare</h1>
            <h2 className="subtitle">Expanded AutoTrader car comparing tool</h2>
          </div>
        </div>
      </section>
      <section>
        <label htmlFor="urban">
          urban
          <input type="checkbox" name="urban" id="urban" onChange={onCheck} />
        </label>
        <label htmlFor="extra">
          extra
          <input type="checkbox" name="extra" id="extra" onChange={onCheck} />
        </label>
        <label htmlFor="combined">
          combined
          <input
            type="checkbox"
            name="combined"
            id="combined"
            onChange={onCheck}
          />
        </label>
      </section>
      <section className="input-container section">
        <form className="control postcode" onSubmit={addPost}>
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
            <span className="tag is-light">
              Current postcode:{context.postcode[0].postcode}
            </span>
          ) : (
            <span className="tag is-light">
              Enter postcode to instantly get directions from you to the car!
            </span>
          )}
        </form>
        <form className="control" onSubmit={addCarFunc}>
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
      </section>
      <section className="comparing-container tile is-ancestor section">
        {context.list.map(item => {
          return <CompareItem key={item._id} item={item} />;
        })}
      </section>
    </div>
  );
}
