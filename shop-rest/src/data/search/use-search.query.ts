
import { Search } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";


export const fetchSearch = async (slug: string) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.SEARCH}/${slug}`);
  return data;
};


export const useSearchQuery = (slug: string) => {
  return useQuery<Search, Error>([API_ENDPOINTS.SEARCH, slug], () =>
    fetchSearch(slug)
  );
};
