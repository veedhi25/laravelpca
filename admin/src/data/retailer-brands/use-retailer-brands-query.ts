// use-brand.query.ts
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";

export const fetchRetailerBrands = async () => {
  const { data } = await http.get(`${API_ENDPOINTS.RETAILER_BRANDS}`);
  return data;
};

export const useRetailerBrandsQuery = () => {
  return useQuery([API_ENDPOINTS.RETAILER_BRANDS], () => fetchRetailerBrands());
};
