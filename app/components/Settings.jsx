import React from 'react';
import {connect} from 'react-redux';
import {addUrl, delUrl, changeUrlInputVal} from '../actions';

const Item = ({text, handleUrlDel}) => (
  <li className="collection-item">
    <span>{text}</span>
    <a href="#" className="secondary-content" onClick={() => {handleUrlDel(text)}}>
      <i className="material-icons">delete</i>
    </a>
  </li>
);

const loadUrls = (urls, func) => {
  return urls.map((url, idx) => (<Item key={idx} text={url} handleUrlDel={func} />));
};

const settings = ({value, urls, handleValChange, handleUrlDel, handleUrlAdd}) => (
  <div>
    <h1>settings</h1>
    <div className="input-field col s12">
      <input type="text" className="validate" placeholder="url" value={value} onChange={handleValChange} />
    </div>
    <div>
      <button className="btn-large waves-effect waves-light center-align" onClick={handleUrlAdd}>Add URL
        <i className="material-icons right">get_app</i>
      </button>
    </div>
    <ul className="collection">
      {loadUrls(urls, handleUrlDel)}
    </ul>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    value: state.urlInputVal,
    urls: state.urls
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleUrlAdd: () => {
      dispatch(addUrl());
    },
    handleUrlDel: (url) => {
      dispatch(delUrl(url));
    },
    handleValChange: (ev) => {
      dispatch(changeUrlInputVal(ev.target.value));
    }
  };
};

const Settings = connect(mapStateToProps, mapDispatchToProps)(settings);

export default Settings;