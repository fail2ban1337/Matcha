import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SET_ALERT,
  REMOVE_ALERT,
  FAILIED_REGISTRATION,
  SUCCESS_REGISTRATION
} from "./actionTypes";

export const login = async (email, password, remember, dispatch) => {
  let config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  try {
    let res = await axios.post(
      "/api/users/login",
      { email, password, remember },
      config
    );
    if (!res.data.success) {
      dispatch({
        type: SET_ALERT,
        payload: {
          alertType: "danger",
          msg: res.data.errorMsg
        }
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT
        });
      }, 5000);
    } else {
      res = await axios.get("/api/users/current");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const activation = async (username, token, dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  const res = await axios.get(
    "/api/users/activation",
    { params: { userName: username, token: token } },
    config
  );
  console.log(res);
  if (!res.data.success) {
    console.log(res.data.errorMsg);
  } else {
    console.log(res.data.errorMsg);
    dispatch({
      type: SET_ALERT,
      payload: {
        alertType: "danger",
        msg: res.data.errorMsg
      }
    });
    window.location = "/login";
  }
};

export const register = async (mydata, dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/users/register", mydata, config);
    console.log(res);
    if (!res.data.success) {
      dispatch({
        type: FAILIED_REGISTRATION,
        payload: {
          message: res.data.errorMsg,
          errors: res.data.errors
        }
      });
      dispatch({
        type: SET_ALERT,
        payload: {
          alertType: "danger",
          msg: res.data.errorMsg
        }
      });
    } else {
      dispatch({
        type: SET_ALERT,
        payload: {
          alertType: "success",
          msg: res.data.SuccessMsg
        }
      });
      dispatch({
        type: SUCCESS_REGISTRATION,
        payload: {
          email: mydata.email,
          message: res.data.errorMsg
        }
      });
    }
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: {
        alertType: "danger",
        msg: "Register unsuccess"
      }
    });
  }
};
export const loadUser = async dispatch => {
  try {
    const res = await axios.get("/api/users/current");
    if (res.data.success) {
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      });
    } else {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const updateUser = async data => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      oldPassword,
      newPassword
    } = data;
  } catch (error) {}
};
