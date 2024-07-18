
import { useMutation } from "react-query";
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";


const createUserProfile = async (formData) => {
  const { data } = await http.post(`${url}/${API_ENDPOINTS.PROFILE}`, formData);
  return data;
};

export const useUserProfileMutation = () => {
  return useMutation(createUserProfile);
};
