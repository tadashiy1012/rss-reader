import React from 'react';
import {connect} from 'react-redux';
import {setShows, loadUrls} from '../actions';
import ListItem from './ListItem.jsx';
const {ipcRenderer} = window.require('electron');

let init = false;
const items = ['hogehoge', 'fugafuga', 'piyopiyo'];

const main = ({handleLoad, handleShows}) => {
  const obj = {};
  const nodes = items.map((val, idx) => {
    obj[idx] = false;
    return (<ListItem key={idx} idx={idx} text={val} />);
  });
  if (!init) {
    console.log('init');
    init = true;
    handleShows(obj);
    handleLoad();
  }
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
  return state;
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