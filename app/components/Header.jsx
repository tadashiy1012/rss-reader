import React from 'react';
import {connect} from 'react-redux';
import {slctMain, slctSet} from '../actions';

const header = ({handleMain, handleSet}) => (
  <nav>
    <div className="nav-wrapper">
      <a className="left brand-logo">RSS-Reader</a>
      <ul className="right">
        <li><a href="#" onClick={handleMain}>main</a></li>
        <li><a href="#" onClick={handleSet}>settings</a></li>
      </ul>
    </div>
  </nav>
);

const mapStateToProps = (state, props) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleMain: () => {
      dispatch(slctMain('main'));
    },
    handleSet: () => {
      dispatch(slctSet('set'));
    }
  };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(header);

export default Header;