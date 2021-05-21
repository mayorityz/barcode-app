import axios from "axios";

const URL = "https://scanner-app-1.herokuapp.com";

export const login = async (params) => {
  try {
    const { data } = await axios.post(`${URL}/login`, params);
    return data;
  } catch (error) {
    return error.message;
  }
};
