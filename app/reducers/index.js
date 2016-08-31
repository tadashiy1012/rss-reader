import {handleAction, handleActions} from 'redux-actions';
import {slctMain, slctSet,
  setShows, showCard} from '../actions';

const reducer = handleActions({
  [slctMain]: (state, action) => Object.assign({}, state, {
    content: action.payload
  }),
  [slctSet]: (state, action) => Object.assign({}, state, {
    content: action.payload
  }),
  [setShows]: (state, action) => Object.assign({}, state, {
    cardShows: action.payload
  }),
  [showCard]: (state, action) => {
    console.log(action.payload);
    let obj = Object.assign({}, state.cardShows, {
      [action.payload[0]]: action.payload[1]
    });
    console.log(obj);
    let result = Object.assign({}, state, {
      cardShows: obj
    });
    console.log(result);
    return result;
  }
}, {
  content: 'main',
  cardShows: {hoge:'hoge'}
});

export default reducer;