import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
 

export const fetchAuthBrandById = async (id: number) => {
    const { data } = await http.get(`${API_ENDPOINTS.GET_AUTH_BRANDS}/${id}`);
    return data;
  };
  
  export const useAuthBrandByIdQuery = (id: number) => {
    return useQuery([API_ENDPOINTS.GET_AUTH_BRANDS, id], () =>
      fetchAuthBrandById(id)
    );
  };
  