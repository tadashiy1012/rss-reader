import React from 'react';
import {connect} from 'react-redux';

const settings = () => (
  <div>
    <h1>settings</h1>
  </div>
);

const mapStateToProps = (state, props) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const Settings = connect(mapStateToProps, mapDispatchToProps)(settings);

export default Settings;