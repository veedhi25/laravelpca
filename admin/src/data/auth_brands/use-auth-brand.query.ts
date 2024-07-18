 import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
 
export const fetchAuthBrand = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.GET_AUTH_BRANDS}`);
  return data;
};

export const useAuthBrandQuery = () => {
  return useQuery([API_ENDPOINTS.GET_AUTH_BRANDS], () =>
    fetchAuthBrand()
  );
};
