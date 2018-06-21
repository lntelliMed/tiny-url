import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tinyUrl: '',
  isPending: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TINYURL_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case actionTypes.FETCH_TINYURL_SUCCESS:
      return {
        ...state,
        tinyUrl: action.tinyUrl,
        isPending: false,
        error: null
      };
    case actionTypes.FETCH_TINYURL_FAILED:
      return {
        ...state,
        isPending: false,
        error: action.error
      };
    case actionTypes.RESET_STATE:
      return {
        ...state,
        tinyUrl: '',
        isPending: false,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
