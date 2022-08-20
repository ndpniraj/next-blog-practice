import axios from "axios";

export const getMostActiveUsers = async (pageNo: number, limit: number) => {
  const { data } = await axios(
    `/api/admin/user?pageNo=${pageNo}&limit=${limit}`
  );
  return data;
};
