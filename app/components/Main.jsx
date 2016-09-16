import React from 'react';
import {connect} from 'react-redux';
import {setShows, loadUrls, readFeeds} from '../actions';
import ListItem from './ListItem.jsx';
import {Promise} from 'es6-promise';
import * as reader from 'rss-reader-lib';
const {ipcRenderer} = window.require('electron');

let init = false;
let items = ['hogefuga'];

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

const main = ({urls, feeds, handleLoad, handleShows}) => {
  const obj = {};
  const nodes = items.map((val, idx) => {
    obj[idx] = false;
    return (<ListItem key={idx} idx={idx} text={val} />);
  });
  if (!init) {
    console.log('init');
    init = true;
    handleLoad();
    handleShows(obj);
  }
  read(urls).then((resp) => {
    console.log(resp);
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
    feeds: state.feeds
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShows: (obj) => {
      dispatch(setShows(obj));
    },
    handleLoad: () => {
      dispatch(loadUrls(ipcRenderer.sendSync('loadUrls')));
    }
  };
};

const Main = connect(mapStateToProps, mapDispatchToProps)(main);

export default Main;