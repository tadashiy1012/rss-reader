import React from 'react';
import {connect} from 'react-redux';
import {showCard} from '../actions';

const f = () => {
  console.log('click!');
};

const Card = ({val}) => (
  <div className="card">
    <p>{val.content}</p>
  </div>
);

const item = ({obj, cardShow, handleShow}) => {
  console.log(obj);
  return (
  <li className="collection-item" onClick={() => {handleShow(cardShow);}}>
    {obj.title}
    <br />
    {cardShow ? <Card val={obj} /> : null}
  </li>
)};

const mapStateToProps = (state, props) => {
  console.log(state.cardShows);
  return {
    cardShow: state.cardShows[props.idx]
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShow: (arg) => {
      console.log('click!!');
      console.log(props.idx);
      console.log(arg);
      dispatch(showCard([props.idx, !arg]));
    }
  };
};

const ListItem = connect(mapStateToProps, mapDispatchToProps)(item);

export default ListItem;