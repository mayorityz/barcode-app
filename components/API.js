import axios from "axios";

const URL = "http://192.168.43.94:4500";

export const login = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/login`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};
