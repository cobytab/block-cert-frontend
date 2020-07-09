import {
  VERIFY_DATA,
  SET_LOADING,
  SET_MESSAGE,
  RESET_VALIDITY,
} from "../types";
import { sessionService } from "redux-react-session";
import axios from "axios";

export const loginUser = (credentials, history) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(
      "https://school-work-project.herokuapp.com/api/v1/User/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const { success, message, user } = response.data;
      if (!success) {
        dispatch(setMessage(message.toLowerCase()));
        dispatch(setLoading(false));
      } else {
        const { token } = user;

        sessionService
          .saveSession(token)
          .then(() => {
            sessionService
              .saveUser({ ...user })
              .then(() => {
                history.push("/dashboard");
                dispatch(setLoading(false));
              })
              .catch((err) => {
                dispatch(
                  setMessage("An error occurred while saving user session.")
                );
                console.log(err);
                dispatch(setLoading(false));
              });
          })
          .catch((err) => {
            dispatch(
              setMessage("An error occurred while saving login session.")
            );
            console.log(err);
            dispatch(setLoading(false));
          });
      }
    })
    .catch((err) => {
      dispatch(setMessage("An error occurred while logging in."));
      dispatch(setLoading(false));
      console.log(err);
    });
};

export const signupUser = (credentials, history) => (dispatch) => {
  dispatch(setLoading(true));

  axios
    .post(
      "https://school-work-project.herokuapp.com/api/v1/user/register",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const { success, message } = response.data;
      if (!success) {
        dispatch(setMessage(message.toLowerCase()));
        dispatch(setLoading(false));
      } else {
        const { email, password } = credentials;
        dispatch(loginUser({ email, password }, history));
      }
    })
    .catch((err) => {
      dispatch(setMessage("An error occurred while signing up."));
      console.log(err);
      dispatch(setLoading(false));
    });
};

export const logoutUser = (history) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push("/login");
  };
};

export const verifyData = (details, history) => (dispatch) => {
  dispatch(setLoading(true));

  // Do some magic with the details
  const status = "valid";

  dispatch({
    type: VERIFY_DATA,
    payload: status,
  });
  history.push("/dashboard");
  dispatch(setLoading(false));
};

export const resetValidity = () => {
  return {
    type: RESET_VALIDITY,
  };
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
