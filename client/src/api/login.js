import { postHelper } from "../helpers/apiHelper";

export const loginUser = async (name) => {
  return await postHelper("/login", { name });
};
