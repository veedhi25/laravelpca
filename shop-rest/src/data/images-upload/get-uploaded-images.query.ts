import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
 

export const fetchImagesByUserId = async (user_id: string) => {
    const { data } = await http.get(`${url}/${API_ENDPOINTS.IMAGE_UPLOAD}/${user_id}`);
    return data;
  };
  
export const getImagesByUserId = (user_id: string) => {
 return useQuery(['images', user_id], () => fetchImagesByUserId(user_id));
};
  