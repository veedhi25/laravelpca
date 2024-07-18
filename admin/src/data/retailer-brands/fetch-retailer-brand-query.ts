// use-brand.query.ts
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";

// Update this to take an id parameter
export const fetchRetailerBrandById = async (id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.RETAILER_BRANDS}/${id}`);
  return data;
};

export const useRetailerBrandByIdQuery = (id: string) => {
  return useQuery([API_ENDPOINTS.RETAILER_BRANDS, id], () => fetchRetailerBrandById(id));
};
