
import { useMutation, useQuery } from "react-query";
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";


const getAllUsersProfile = async () => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.PROFILE}` );
  return data;
};

export const useAllUsersProfileDetailQuery = () => {
  return useQuery("usersProfile", getAllUsersProfile);
};

