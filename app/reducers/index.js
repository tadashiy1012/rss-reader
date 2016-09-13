import {handleAction, handleActions} from 'redux-actions';
import {slctMain, slctSet,
  setShows, showCard,
  addUrl, delUrl, changeUrlInputVal
} from '../actions';

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
    let obj = Object.assign({}, state.cardShows, {
      [action.payload[0]]: action.payload[1]
    });
    let result = Object.assign({}, state, {
      cardShows: obj
    });
    return result;
  },
  [changeUrlInputVal]: (state, action) => Object.assign({}, state, {
    urlInputVal: action.payload
  }),
  [addUrl]: (state, action) => Object.assign({}, state, {
    urls: [state.urlInputVal].concat(state.urls)
  }),
  [delUrl]: (state, action) => Object.assign({}, state, {
    urls: state.urls.filter((val, idx, ary) => {
      return val !== action.payload
    })
  })
}, {
  content: 'main',
  cardShows: {hoge:'hoge'},
  urlInputVal: 'hoge',
  urls: [
    'http://hogehoge',
    'http://fugafuga',
    'http://piyopiyo'
  ]
});

export default reducer;