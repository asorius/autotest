import React, { useContext, useState } from 'react';
import Context from '../context/context';
import CompareItem from './CompareItem';
import classnames from 'classnames';

export default function LandingPage(props) {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
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
  const addCarFunc = async e => {
    setLoading(!loading);
    e.preventDefault();
    try {
      await context.addCarToList({ url });
      setLoading(false);
      setUrl('');
    } catch (e) {
      return { errored: e };
    }
  };
  const addPost = async e => {
    e.preventDefault();
    try {
      await context.addPostToList(post);
      console.log(context.postcode);
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
      <section className="input-container section">
        <form className="control postcode" onSubmit={addPost}>
          <input
            className="input is-rounded"
            type="text"
            onChange={onPost}
            placeholder="Your postcode"
          />
          <button type="submit" className="button">
            Find
          </button>
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
