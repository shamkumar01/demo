import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_OTP_REQUEST,
  USER_OTP_SUCCESS,
  USER_OTP_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from "../redux/userAction";

const initialState = {
  user: [],
  isloading: false,
  success: "",
  error: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, isloading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isloading: false,
        user: action.payload.user,
        success: action.payload.message,
      };
    case USER_REGISTER_FAILURE:
      return { ...state, isloading: false, error: action.payload };
    // case USER_REGISTER_REQUEST:
    //   return { ...state, isloading: false, error: action.payload };
    case USER_OTP_REQUEST:
      return { ...state, isloading: true };
    case USER_OTP_SUCCESS:
      return { ...state, isloading: false, success: action.payload };
    case USER_OTP_FAILURE:
      return { ...state, isloading: false, error: action.payload };
    case USER_LOGIN_REQUEST:
      return { ...state, isloading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, isloading: false, user: action.payload.user };
    case USER_LOGIN_FAILURE:
      return { ...state, isloading: false, error: action.payload };
    case USER_LOGOUT_REQUEST:
      return { ...state, isloading: true };
    case USER_LOGOUT_SUCCESS:
      return { ...state, isloading: false, succes: "Logged Out", user: {} };
    default:
      return state;
  }
};
export { rootReducer };
