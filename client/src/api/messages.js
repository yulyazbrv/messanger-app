import { getHelper } from "../helpers/apiHelper";

export const getMessages = async () => {
  return await getHelper("/messages");
};