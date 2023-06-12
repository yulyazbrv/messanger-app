import axios from "axios";
import { loginUser } from "../api/login";
import { API_URL } from "../helpers/apiHelper";
import { logoutUser } from "../api/logout";
import { sendMessage } from "../api/sendMessage";

export const login = async (name) => {
  try {
    const response = await loginUser(name);
    localStorage.setItem("token", response.accessToken);
  } catch (e) {
    throw new Error("Incorrect data");
  }
};

export const logout = async () => {
  try {
    await logoutUser();
    localStorage.removeItem("token");
  } catch (e) {
    console.log(e.response?.message);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response;
  } catch (e) {
    console.log(e.response?.message);
  }
};

export const send = async (recipient, title, body) => {
  try {
    await sendMessage(recipient, title, body);
  } catch (e) {
    console.log(e.response?.message);
  }
};
