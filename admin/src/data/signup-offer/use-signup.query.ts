import Category from "@repositories/category";
import { useQuery } from "react-query";
import { Category as TCategory } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchSignup = async () => {
  const { data } = await Category.find(`${API_ENDPOINTS.SIGNUP_OFFER}`);
  return data;
};

export const useSignupQuery = () => {
  return useQuery<TCategory, Error>([API_ENDPOINTS.SIGNUP_OFFER], () =>
  fetchSignup()
  );
};
