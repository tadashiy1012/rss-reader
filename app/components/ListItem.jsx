import React from 'react';
import {connect} from 'react-redux';
import {setShows} from '../actions';

const Card = ({content, date, link}) => (
  <div className="card">
    <p style={{'padding':'8px'}}>
      {content}
      <hr />
      <div className="row">
        <div className="col s6">
          <div className="center-align">date:<span>{date}</span></div>
        </div>
        <div className="col s6">
          <a href={link} className="waves-effect waves-teal btn center-align">src site</a>
        </div>
      </div>
    </p>
  </div>
);

const item = ({obj, show, handleSetShows}) => {
  if (show === undefined) {
    console.log('show is undefined');
    handleSetShows(obj.idx, false);
  } 
  const dt = new Date(obj.date);
  const date = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes();
  return (
  <li className="collection-item" onClick={() => {
    handleSetShows(obj.idx, !show);
  }}>
    {obj.title}
    <br />
    {show ? <Card content={obj.content} date={date} link={obj.link} /> : null}
  </li>
)};

const mapStateToProps = (state, props) => {
  return {
    show: state.shows[props.obj.idx]
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSetShows: (idx, value) => {
      dispatch(setShows([idx, value]))
    }
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(item);

export default ListItem;