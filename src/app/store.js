import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

// Auth
import { sessionService } from 'redux-react-session';


const initialState = {};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

sessionService.initSessionService(store);

export default store;
