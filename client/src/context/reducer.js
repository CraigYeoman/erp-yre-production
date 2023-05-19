import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  CHANGE_PATH,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_FILTERS,
  POST_DATA_BEGIN,
  POST_DATA_SUCCESS,
  POST_DATA_ERROR,
  EDIT_FORM_LOAD,
  GET_FORM_DATA_BEGIN,
  GET_FORM_DATA_SUCCESS,
} from "./action";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_DATA_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_DATA_SUCCESS) {
    return { ...state, isLoading: false, data: action.payload.data };
  }

  if (action.type === POST_DATA_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
      response: false,
      responseText: "",
      responseError: false,
      responseTextError: "",
    };
  }

  if (action.type === POST_DATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      responseText: action.payload.data,
      response: true,
    };
  }

  if (action.type === POST_DATA_ERROR) {
    return {
      ...state,
      isLoading: false,
      responseTextError: action.payload,
      responseError: true,
    };
  }

  if (action.type === CHANGE_PATH) {
    return { ...state, path: action.payload.path };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSideBar: !state.showSideBar };
  }

  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      sort: "date_due",
      complete: "false",
      jobType: "all",
    };
  }

  if (action.type === EDIT_FORM_LOAD) {
    return {
      ...state,
      showAlert: false,
      response: false,
      responseText: "",
      responseError: false,
      responseTextError: "",
    };
  }

  if (action.type === GET_FORM_DATA_BEGIN) {
    return {
      ...state,
      isLoading: true,
      formData: "",
    };
  }
  if (action.type === GET_FORM_DATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      formData: action.payload.data,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
