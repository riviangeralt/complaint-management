import instanceApi from "./index";

export const createComplaint = async (data) => {
  try {
    const complaint = await instanceApi.post("/create", data);
    return complaint.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getAllComplaints = async () => {
  try {
    const complaints = await instanceApi.get("/complaint");
    return complaints.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateComplaint = async (id, data) => {
  try {
    const complaint = await instanceApi.put(`/complaint/${id}`, data);
    return complaint.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteComplaint = async (id) => {
  try {
    const complaint = await instanceApi.delete(`/complaint/${id}`);
    return complaint.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getSingleComplaint = async (id) => {
  try {
    const complaint = await instanceApi.get(`/complaint/${id}`);
    return complaint.data;
  } catch (err) {
    return err.response.data;
  }
};

//admin routes
export const getComplaintsByStatus = async () => {
  try {
    const complaints = await instanceApi.get(`/status`);
    return complaints.data;
  } catch (error) {
    return error.response.data;
  }
};

export const manageComplaint = async () => {
  try {
    const complaints = await instanceApi.get(`/manage`);
    return complaints.data;
  } catch (error) {
    return error.response.data;
  }
};
