import axios from "axios";
const URL = "https://scanner-app-1.herokuapp.com";
// const URL = "http://192.168.43.94:4500";
// const URL = "http://172.16.2.135:4500";

export const login = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/login`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const newRecord = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/addition`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getRecord = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/fetchrecord`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const Logs = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/newLog`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};
