import {handleAction, handleActions} from 'redux-actions';
import {slctMain, slctSet} from '../actions';

const reducer = handleActions({
  [slctMain]: (state, action) => Object.assign({}, state, {
    content: action.payload
  }),
  [slctSet]: (state, action) => Object.assign({}, state, {
    content: action.payload
  })
}, {
  content: 'main'
});

export default reducer;