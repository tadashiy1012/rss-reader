import {handleAction, handleActions} from 'redux-actions';
import {slctMain, slctSet,
  setShows, showCard,
  loadUrls, addUrl, delUrl, changeUrlInputVal,
  readFeeds, addItems
} from '../actions';
const {ipcRenderer} = window.require('electron');

ipcRenderer.on('saveUrls-reply', (ev, arg) => {
  console.log(ev, arg);
});

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
  [loadUrls]: (state, action) => Object.assign({}, state, {
    urls: action.payload
  }),
  [addUrl]: (state, action) => {
    const urls = [state.urlInputVal].concat(state.urls);
    const obj = Object.assign({}, state, {
      urls: urls
    });
    ipcRenderer.send('saveUrls', urls);
    return obj;
  },
  [delUrl]: (state, action) => {
    const urls = state.urls.filter((val, idx, ary) => {
      return val !== action.payload
    });
    const obj = Object.assign({}, state, {
      urls: urls
    });
    ipcRenderer.send('saveUrls', urls);
    return obj;
  },
  [readFeeds]: (state, action) => {
    const obj = Object.assign({}, state, {
      feeds: action.payload
    });
    return obj;
  },
  [addItems]: (state, action) => Object.assign({}, state, {
    items: action.payload
  })
}, {
  content: 'main',
  cardShows: {hoge:'hoge'},
  urlInputVal: 'hoge',
  urls: [],
  feeds: [],
  items: []
});

export default reducer;