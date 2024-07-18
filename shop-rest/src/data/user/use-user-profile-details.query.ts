
import { useMutation, useQuery } from "react-query";
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";


const getUserProfileDetails = async ({ id }) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.PROFILE}/${id}`);
  return data;
};

export const useUserProfileDetailsQuery = (id) => {
  return useQuery(["userProfile", id], () => getUserProfileDetails({ id }));
};


