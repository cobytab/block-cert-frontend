import { LOG_OUT } from "../types";

const initialState = {
  authenticated: true,
  userDetails: {},
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_OUT: {
      return {
        ...state,
        authenticated: false,
        userDetails: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
