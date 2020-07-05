import { LOG_OUT } from "../types";

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
