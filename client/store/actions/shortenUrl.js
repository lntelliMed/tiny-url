import axios from 'axios';

import * as actionTypes from './actionTypes';

export const initTinyUrlSuccess = (tinyUrl) => {
  return {
    type: actionTypes.FETCH_TINYURL_SUCCESS,
    tinyUrl
  };
};

export const initTinyUrlPending = () => {
  return {
    type: actionTypes.FETCH_TINYURL_PENDING
  };
};

export const initTinyUrlFailed = (error) => {
  return {
    type: actionTypes.FETCH_TINYURL_FAILED,
    error
  };
};

export const fetchTinyUrl = (longUrl) => {
  return dispatch => {
    dispatch(initTinyUrlPending());
    axios.post('/api/urls', {longUrl})
      .then(response => dispatch(initTinyUrlSuccess(response.data.shortUrl)))
      .catch(err => dispatch(initTinyUrlFailed(err)));
  }
};

export const resetState = () => {
  return {
    type: actionTypes.RESET_STATE
  };
};
