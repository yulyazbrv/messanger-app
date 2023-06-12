import { postHelper } from "../helpers/apiHelper";

export const sendMessage = async (userTo, title, message) => {
  return await postHelper("/sendMessage", { userTo, title, message });
};
