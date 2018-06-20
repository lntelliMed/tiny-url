import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tinyUrl: '',
  longUrl: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TINY_URL:
      return {
        ...state,
        tinyUrl: action.tinyUrl
      };
    case actionTypes.FETCH_LONG_URL:
      return {
        ...state,
        longUrl: action.longUrl
      };
    default:
      return state;
  }
};

export default reducer;
