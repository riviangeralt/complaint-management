import axios from "axios";

const instanceApi = axios.create({
  baseURL: "https://project-complaint.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  timeout: 10000,
});

export default instanceApi;
