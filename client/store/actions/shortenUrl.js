import axios from 'axios';

import * as actionTypes from './actionTypes';

export const initTinyUrl = (tinyUrl) => {
  return {
    type: actionTypes.FETCH_TINY_URL,
    tinyUrl
  };
};


export const fetchTinyUrl = (longUrl) => {
  return dispatch => {
    axios.post('/api/urls', {longUrl})
      .then(response => dispatch(initTinyUrl(response.data.shortUrl)))
      .catch(console.error);
  }
};


export const initLongUrl = (longUrl) => {
  return {
    type: actionTypes.FETCH_LONG_URL,
    longUrl
  };
};


export const fetchLongUrl = (shortUrl) => {
  return dispatch => {
    axios.get(`api/urls/${shortUrl}`)
      .then(response => dispatch(initLongUrl(response.data.longUrl)))
      .catch(console.error);
  }
};
