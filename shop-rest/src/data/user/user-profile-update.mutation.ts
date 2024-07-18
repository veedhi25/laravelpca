
import { useMutation } from "react-query";
import http from "@utils/api/http";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import url from "@utils/api/server_url";


const updateUserProfile = async (formData:any) => {
    console.log('formdata',formData)
  const { data } = await http.put(`${url}/${API_ENDPOINTS.UPDATE_PROFILE}/${formData.id}`, formData);
  return data;
};

export const useUserProfileUpdateMutation = () => {
  return useMutation(updateUserProfile);
};
