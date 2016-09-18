import {handleAction, handleActions} from 'redux-actions';
import {slctMain, slctSet,
  setShows, 
  loadUrls, addUrl, delUrl, changeUrlInputVal,
  setFeeds
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
  [setShows]: (state, action) => {
    const shows = Object.assign({}, state.shows, {
      [action.payload[0]]: action.payload[1]
    });
    return Object.assign({}, state, {
      shows: shows 
    });
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
  [setFeeds]: (state, action) => {
    const obj = Object.assign({}, state, {
      feeds: action.payload
    });
    return obj;
  }
}, {
  content: 'main',
  shows: {},
  urlInputVal: '',
  urls: [],
  feeds: []
});

export default reducer;