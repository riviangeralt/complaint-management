// we will get data from server and set it in localStorage

import instanceApi from "./index";

export const setAuthorizationHeader = (token) => {
  if (token) {
    instanceApi.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete instanceApi.defaults.headers.common["Authorization"];
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    if (data.status === "success") {
      localStorage.setItem("jwt", JSON.stringify(data));
      setAuthorizationHeader(data.token);
      next();
    } else {
      return data;
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
