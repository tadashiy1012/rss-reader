import {createAction} from 'redux-actions';

export const slctMain = createAction('SLCT_MAIN');
export const slctSet = createAction('SLCT_SET');
export const setShows = createAction('SET_SHOWS');
export const showCard = createAction('SHOW_CARD');
export const loadUrls = createAction('LOAD_URLS');
export const addUrl = createAction('ADD_URL');
export const delUrl = createAction('DEL_URL');
export const changeUrlInputVal = createAction('CHANGE_URL_INPUT_VAL');