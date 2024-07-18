import { QueryParamsType, TypesQueryOptionsType } from "@ts-types/custom.types";
import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Type from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Type as ShopCategory } from "@ts-types/generated";

const fetchShopCategories = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as TypesQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.SELECT_SHOP_CATEGORIES}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Type.all(url);
  return { shopCategories: data as ShopCategory[] };
};

type TypeResponse = {
  shopCategories: ShopCategory[];
};

const useShopCategoryQuery = (options: TypesQueryOptionsType = {}) => {
  return useQuery<TypeResponse, Error>(
    [API_ENDPOINTS.SELECT_SHOP_CATEGORIES, options],
    fetchShopCategories,
    {
      keepPreviousData: true,
    }
  );
};

export { useShopCategoryQuery, fetchShopCategories };
