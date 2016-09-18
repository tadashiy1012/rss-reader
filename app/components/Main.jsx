import React from 'react';
import {connect} from 'react-redux';
import {setFeeds, addItems, setShows} from '../actions';
import ListItem from './ListItem.jsx';
import {Promise} from 'es6-promise';
import * as reader from 'rss-reader-lib';

let init = false;

const read = (urls) => {
  return new Promise((resolve, reject) => {
    const ary = [];
    for (let url of urls) {
      ary.push(reader.default(url));
    }
    Promise.all(ary).then((values) => {
      resolve(values);
    }, (err) => {
      console.log(err);
    });
  });
};

const proc = (src) => {
  const ary = [];
  let count = 0;
  for (let feeds of src) {
    const title = feeds[0];
    for (let feed of feeds[1]) {
      feed.idx = (count += 1);
      feed.title = title + ':' + feed.title;
      ary.push(feed);
    }
  }
  const sorted = ary.sort((a, b) => {
    return new Date(a.date).getTime - new Date(b.date).getTime;
  }).reverse();
  return sorted;
};

const main = ({urls, feeds, handleSetFeeds, handleSetShows}) => {
  if (!init) {
    init = true;
    read(urls).then((resp) => {
      handleSetFeeds(proc(resp));
    });
  }
  const nodes = feeds.map((val, idx) => {
    return (<ListItem key={idx} obj={val} />);
  });
  return (
  <div>
    <h1>main</h1>
    <ul className="collection">
      {nodes}
    </ul>
  </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    urls: state.urls,
    feeds: state.feeds
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSetFeeds: (arg) => {
      console.log(arg);
      dispatch(setFeeds(arg));
    }
  };
};

const Main = connect(mapStateToProps, mapDispatchToProps)(main);

export default Main;