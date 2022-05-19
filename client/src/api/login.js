import instanceApi from "./index";

export const login = async (data) => {
  try {
    const user = await instanceApi.post("/login", data);
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};

export const register = async (data) => {
  try {
    const user = await instanceApi.post("/register", data);
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = async (next) => {
  try {
    //we have to remove token from localStorage and send user to login page
    const user = await instanceApi.post("/logout");
    localStorage.removeItem("jwt");
    next();
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};
