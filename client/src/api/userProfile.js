import instanceApi from "./index";

export const getUserProfile = async () => {
  try {
    const user = await instanceApi.get("/profile");
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const user = await instanceApi.put("/profile", data);
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteUserProfile = async () => {
  try {
    const user = await instanceApi.delete("/profile");
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUserCount = async () => {
  try {
    const userCount = await instanceApi.get("/count");
    return userCount.data;
  } catch (err) {
    return err.response.data;
  }
};

export const allUsers = async () => {
  try {
    const userCount = await instanceApi.get("/users");
    return userCount.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateUserProfileByAdmin = async (id, data) => {
  try {
    const user = await instanceApi.put(`/users/${id}`, data);
    return user.data;
  } catch (err) {
    return err.response.data;
  }
};
