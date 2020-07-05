import { LOG_OUT, LOG_IN } from "../types";
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
