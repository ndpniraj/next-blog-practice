import axios from "axios";
import { INewUserInfo } from "./types";

export const sendSignupRequest = async (
  userInfo: INewUserInfo
): Promise<{ user: { name: string; email: string } }> => {
  const { data } = await axios.post("/api/auth/signup", userInfo);
  return data;
};
