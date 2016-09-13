import React from 'react';
import {connect} from 'react-redux';

const sampleData = [
  'hogehoge',
  'fugafuga',
  'piyopiyo'
];

const Item = ({text}) => (
  <li className="collection-item">
    <span>{text}</span>
    <a className="secondary-content">
      <i className="material-icons">delete</i>
    </a>
  </li>
);

const sampleItems = () => {
  return sampleData.map((data) => {
    return (<Item text={data} />);
  });
}

const settings = () => (
  <div>
    <h1>settings</h1>
    <div className="input-field col s12">
      <input type="text" className="validate" placeholder="url" />
    </div>
    <div>
      <button className="btn-large waves-effect waves-light center-align">Add URL
        <i className="material-icons right">get_app</i>
      </button>
    </div>
    <ul className="collection">
      {sampleItems()}
    </ul>
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