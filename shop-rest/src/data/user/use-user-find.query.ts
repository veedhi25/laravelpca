import { User } from "@ts-types/custom.types";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { useQuery } from "react-query";
import url from "@utils/api/server_url";


export const fetchUser = async (id: string) => {
  const { data } = await http.get(`${url}/${API_ENDPOINTS.USERS}/${id}`);
  return data;
};


export const useUserFindQuery = (id: string) => {
  return useQuery<User, Error>([API_ENDPOINTS.USERS, id], () =>
    fetchUser(id)
  );
};
