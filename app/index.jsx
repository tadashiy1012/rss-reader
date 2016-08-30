import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import reducer from './reducers';
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';

const app = () => (
  <div>
    <Header />
    <Content />
  </div>
);

const mapStateToProps = (state, props) => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const App = connect(mapStateToProps, mapDispatchToProps)(app);

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);