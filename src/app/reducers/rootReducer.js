import { combineReducers } from "redux";
import userReducer from "./userReducer";

import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer
});

export default rootReducer;
