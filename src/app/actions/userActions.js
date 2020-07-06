import {
  VERIFY_DATA,
  SET_LOADING,
  SET_MESSAGE,
  RESET_VALIDITY,
} from "../types";
import { sessionService } from "redux-react-session";
import axios from "axios";

export const logoutUser = (history) => {
  return () => {
    // Call api here

    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push("/login");
  };
};

export const loginUser = (credentials, history) => (dispatch) => {
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
        setMessage(message);
      } else {
        const { token } = user;

        sessionService
          .saveSession(token)
          .then(() => {
            sessionService
              .saveUser({ ...user })
              .then(() => {
                history.push("/dashboard");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      setMessage("An error occurred while logging in.");
      console.log(err);
    });
};

export const signupUser = (credentials, history) => {
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

export const verifyData = (details, history) => (dispatch) => {
  dispatch(setLoading(true));

  // Do some magic with the details
  dispatch({
    type: VERIFY_DATA,
    payload: "valid",
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
