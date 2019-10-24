import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SUCCESS_REGISTRATION,
  FAILIED_REGISTRATION
} from "../actions/actionTypes";

export const authInitState = {
  isAuthenticated: false,
  loading: true,
  userInfo: {
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    recovery_key: "",
    username: "",
    verification_key: "",
    verified: ""
  }
};

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userInfo: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        userInfo: {
          email: "",
          first_name: "",
          id: "",
          last_name: "",
          recovery_key: "",
          username: "",
          verification_key: "",
          verified: ""
        }
      };

    default:
      return state;
  }
};

export const registerInitState = {
  register_message: "",
  errors: {
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  }
};

export const registerReducer = (state = registerInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUCCESS_REGISTRATION:
      return {
        ...state,
        register_message: payload.message
      };
    case FAILIED_REGISTRATION:
      return {
        ...state,
        register_message: payload.message,
        errors: payload.errors
      };
    case "LeaveErrors":
      return (state = registerInitState);
    default:
      return state;
  }
};
