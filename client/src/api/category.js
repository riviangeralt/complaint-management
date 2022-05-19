import instanceApi from "./index";

export const getAllCategories = async () => {
  try {
    const categories = await instanceApi.get("/category");
    return categories.data;
  } catch (err) {
    console.log(err);
  }
};

export const createCategory = async (data) => {
  try {
    const category = await instanceApi.post("/create/category", data);
    return category.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const category = await instanceApi.put(`/category/${id}`, data);
    return category.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (id) => {
  try {
    const category = await instanceApi.delete(`/category/${id}`);
    return category.data;
  } catch (err) {
    console.log(err);
  }
};
