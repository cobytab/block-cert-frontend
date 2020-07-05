import { VERIFY_DATA, SET_LOADING, SET_MESSAGE } from "../types";
import { sessionService } from "redux-react-session";

export const logoutUser = (history) => {
  return () => {
    // Call api here

    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push("/login");
  };
};

export const loginUser = (credentials, history) => {
  return () => {
    // Call api for feedback

    const userToken = "testtoken";
    sessionService
      .saveSession({ userToken })
      .then(() => {
        sessionService
          .saveUser({ ...credentials })
          .then(() => {
            history.push("/dashboard");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const verifyData = (details) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch({
    type: VERIFY_DATA,
    payload: details,
  });
  dispatch(setLoading(false));

};

export const setLoading = (status) => {
  return {
    type: SET_LOADING,
    payload: status,
  };
};

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};
