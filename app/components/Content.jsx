import React from 'react';
import {connect} from 'react-redux';
import {loadUrls} from '../actions';
import Main from './Main.jsx';
import Settings from './Settings.jsx';
const {ipcRenderer} = window.require('electron');

let init = false;

const content = ({content, handleLoad}) => {
  if (!init) {
    init = true;
    handleLoad();
  }
  return (
  <div className="container">
    {content === 'main' ? <Main /> : <Settings />}
  </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    content: state.content
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLoad: () => {
      dispatch(loadUrls(ipcRenderer.sendSync('loadUrls')));
    },
  };
};

const Content = connect(mapStateToProps, mapDispatchToProps)(content);

export default Content;