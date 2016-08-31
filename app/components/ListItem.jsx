import React from 'react';
import {connect} from 'react-redux';
import {showCard} from '../actions';

const f = () => {
  console.log('click!');
};

const Card = ({val}) => (
  <div className="card">
    <p>{val}</p>
  </div>
);

const item = ({text, cardShow, handleShow}) => (
  <li className="collection-item" onClick={() => {handleShow(cardShow);}}>
    {text}
    <br />
    {cardShow ? <Card val={text} /> : null}
  </li>
);

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