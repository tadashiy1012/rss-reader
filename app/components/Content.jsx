import React from 'react';
import {connect} from 'react-redux';
import Main from './Main.jsx';
import Settings from './Settings.jsx';

const content = ({content}) => (
  <div className="container">
    {content === 'main' ? <Main /> : <Settings />}
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    content: state.content
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const Content = connect(mapStateToProps, mapDispatchToProps)(content);

export default Content;