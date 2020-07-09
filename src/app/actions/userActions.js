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

  const data = [
    {
      fullName: "Seth Whenton",
      serialNo: "1234001",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
    {
      fullName: "Enoch Omolere",
      serialNo: "1234002",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
    {
      fullName: "Isichei Phelim",
      serialNo: "1234003",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
    {
      fullName: "Godsgift Fredinard Doe",
      serialNo: "1234004",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
    {
      fullName: "Terra Baffoe Andoh",
      serialNo: "1234005",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
    {
      fullName: "Nunya Yao Klah",
      serialNo: "1234006",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
    {
      fullName: "Kelvin Boahene",
      serialNo: "1234007",
      institution: "University Of Ghana",
      degree: "First Class Honours in Bsc. Computer Science",
    },
  ];

  const { fullName, serialNo, institution } = details;

  let status = "invalid";
  let validData = {};

  data.forEach((dataItem) => {
    if (
      dataItem.fullName === fullName &&
      dataItem.serialNo === serialNo &&
      dataItem.institution === institution
    ) {
      status = "valid";
      validData = { ...dataItem };
      return;
    }
  });

  dispatch({
    type: VERIFY_DATA,
    payload: {
      status,
      validData,
    },
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
