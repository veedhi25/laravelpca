import Tax from "@repositories/tax";
import { useQuery } from "react-query";
import { Tax as TTax } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchTax = async () => {
  const { data } = await Tax.find(`${API_ENDPOINTS.ALL_TAXES}`);
  return data;
};

export const useTaxQuery = () => {
  return useQuery<TTax, Error>([API_ENDPOINTS.ALL_TAXES], () => fetchTax());
};
