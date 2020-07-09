import {
  VERIFY_DATA,
  SET_MESSAGE,
  SET_LOADING,
  RESET_VALIDITY,
} from "../types";

const initialState = {
  appLoading: false,
  message: null,
  validity: null,
  validData: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case VERIFY_DATA: {
      const { validData, status } = payload;
      return {
        ...state,
        validity: status,
        validData: validData,
      };
    }
    case RESET_VALIDITY: {
      return {
        ...state,
        validity: null,
      };
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        appLoading: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
