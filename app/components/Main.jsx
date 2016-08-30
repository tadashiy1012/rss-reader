import React from 'react';
import {connect} from 'react-redux';

const main = () => (
  <div>
    <h1>main</h1>
  </div>
);

const mapStateToProps = (state, props) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const Main = connect(mapStateToProps, mapDispatchToProps)(main);

export default Main;