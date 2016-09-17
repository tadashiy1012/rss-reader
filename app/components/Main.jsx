import React from 'react';
import {connect} from 'react-redux';
import {setShows, loadUrls, readFeeds, addItems} from '../actions';
import ListItem from './ListItem.jsx';
import {Promise} from 'es6-promise';
import * as reader from 'rss-reader-lib';
const {ipcRenderer} = window.require('electron');

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

const main = ({urls, feeds, items, handleLoad, handleShows, handleAddItems}) => {
  const shows = {};
  const nodes = items.map((val, idx) => {
    shows[idx] = false;
    return (<ListItem key={idx} idx={idx} obj={val} />);
  });
    if (!init) {
    init = true;
    handleLoad();
    handleShows(shows);
  }
  read(urls).then((resp) => {
    console.log(resp);
    const ary = [];
    for (let feeds of resp) {
      const title = feeds[0];
      for (let feed of feeds[1]) {
        feed.title = title + ':' + feed.title;
        ary.push(feed);
      }
    }
    const sorted = ary.sort((a, b) => {
      return new Date(a.date).getTime - new Date(b.date).getTime;
    }).reverse();
    console.log(sorted);
    handleAddItems(sorted);
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
  console.log(state);
  return {
    urls: state.urls,
    feeds: state.feeds,
    items: state.items
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShows: (obj) => {
      dispatch(setShows(obj));
    },
    handleLoad: () => {
      dispatch(loadUrls(ipcRenderer.sendSync('loadUrls')));
    },
    handleAddItems: (arg) => {
      dispatch(addItems(arg));
    }
  };
};

const Main = connect(mapStateToProps, mapDispatchToProps)(main);

export default Main;