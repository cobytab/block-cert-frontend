import { VERIFY_DATA, SET_MESSAGE, SET_LOADING } from "../types";

const initialState = {
  appLoading: false,
  message: null
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case VERIFY_DATA: {
      return {
        ...state,
      };
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: payload
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        appLoading: payload
      }
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
