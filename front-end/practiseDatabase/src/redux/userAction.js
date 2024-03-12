import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_OTP_REQUEST = "USER_OTP_REQUEST";
export const USER_OTP_SUCCESS = "USER_OTP_SUCCESS";
export const USER_OTP_FAILURE = "USER_OTP_FAILURE";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const userRegister = (FormData, navigate) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const res = await axios.post("/api/register_user", FormData);
    console.log("response from server ", res.data);

    if (res.data.success) {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res.data.message,
      });
      localStorage.setItem("email", res.data.savedUser.email);
      navigate("/otp");
    } else {
      console.log("registration failed");
      dispatch({ type: USER_REGISTER_FAILURE, payload: res.data.message });
    }
  } catch (error) {
    console.log("Error", error);
    dispatch({ type: USER_REGISTER_FAILURE, payload: error.message });
  }
};

export const verifyOtp = (otp, navigate) => async (dispatch) => {
  dispatch({ type: USER_OTP_REQUEST });
  const email = localStorage.getItem("email");
  try {
    const res = await axios.post("/api/verify_otp", { otp, email });
    console.log("response from server ", res.data);

    if (res.data.success) {
      dispatch({
        type: USER_OTP_SUCCESS,
        payload: { message: res.data.message, user: res.data.savedUser },
      });
      localStorage.clear();
      navigate("/login");
    } else {
      dispatch({ type: USER_OTP_FAILURE, payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_OTP_FAILURE, payload: error.message });
  }
};

export const loginUser = (FormData, navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const res = await axios.post("/api/login_User", FormData);
    console.log("response from server", res);
    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { message: res.data.message, user: res.data.user },
      });
      navigate("/");
    } else {
      dispatch({ type: USER_LOGIN_FAILURE, payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    localStorage.clear();
    const res = await axios.get("/api/log_Out");
    console.log("response from server", res);
    if (res.data.success) {
      dispatch({ type: USER_LOGOUT_SUCCESS, payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_LOGOUT_FAILURE, payload: error.message });
  }
};

// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.withCredentials = true;

// export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
// export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
// export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";
// export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
// export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
// export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
// export const USER_OTP_REQUEST = "USER_OTP_REQUEST";
// export const USER_OTP_SUCCESS = "USER_OTP_SUCCESS";
// export const USER_OTP_FAILURE = "USER_OTP_FAILURE";
// export const USER_LOGOUT_REQUEST = "USER_REGISTER_REQUEST";
// export const USER_LOGOUT_FAILURE = "USER_REGISTER_FAILURE";
// export const USER_LOGOUT_SUCCESS = "USER_REGISTER_SUCCESS";

// export const userRegister = (FormData, navigate) => async (dispatch) => {
//   dispatch({ type: USER_REGISTER_REQUEST });
//   try {
//     const res = await axios.post("/api/register_user", FormData);
//     console.log("response from server ", res.data);

//     if (res.data.success) {
//       dispatch({
//         type: USER_REGISTER_SUCCESS,
//         payload: res.data.message,
//       });
//       localStorage.setItem("email", res.data.savedUser.email);
//       navigate("/otp");
//     } else {
//       console.log("registration failed");

//       dispatch({ type: USER_REGISTER_FAILURE, payload: res.data.message });
//     }
//   } catch (error) {
//     console.log("Error", error);
//     // dispatch({
//     //   type: USER_REGISTER_FAILURE,
//     //   payload: error.response.data.message,
//     // });
//   }
// };
// export const verifyOtp = (otp, navigate) => async (dispatch) => {
//   dispatch({ type: USER_OTP_REQUEST });
//   const email = localStorage.getItem("email");
//   try {
//     const res = await axios.post("/api/verify_otp", { otp, email });
//     console.log("response from server ", res.data);

//     if (res.data.success) {
//       dispatch({
//         type: USER_OTP_SUCCESS,
//         payload: { message: res.data.message, user: res.data.savedUser },
//       });
//       localStorage.clear();
//       navigate("/login");
//     } else {
//       dispatch({ type: USER_OTP_FAILURE, payload: res.data.message });
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: USER_OTP_FAILURE, payload: error.response.data.message });
//   }
// };

// export const loginUser = (FormData, navigate) => async (dispatch) => {
//   dispatch({ type: USER_LOGIN_REQUEST });
//   try {
//     const res = await axios.post("/api/login_User", FormData);
//     console.log("responses", res);
//     if (res.data.success) {
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       dispatch({
//         type: USER_LOGIN_SUCCESS,
//         payload: { message: res.data.message, user: res.data.user },
//       });
//       navigate("/Navbar");
//     } else {
//       dispatch({ type: USER_LOGIN_FAILURE, payload: res.data.message });
//     }
//   } catch (error) {
//     dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
//   }
// };

// export const logOut = () => async (dispatch) => {
//   dispatch({ type: USER_LOGOUT_REQUEST });
//   try {
//     localStorage.clear();
//     const res = await axios.get("/api/log_Out");
//     console.log(res);
//     if (res.data.success) {
//       dispatch({ type: USER_LOGOUT_SUCCESS, payload: res.data.message });
//     }
//   } catch (error) {
//     dispatch({ type: USER_LOGOUT_FAILURE, payload: error.message });
//     console.log(error);
//   }
// };
