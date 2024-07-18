import {
  QueryParamsType,
  CategoriesQueryOptionsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchLogs = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    parent,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as CategoriesQueryOptionsType;

  const searchString = stringifySearchQuery({
    location: text,
    type,
  });
  const url = `${API_ENDPOINTS.LOGS}?search=${searchString}&searchJoin=and&limit=${limit}&parent=${parent}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Category.fetchParent(url);
  return { logs: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useLogsQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.LOGS, options],
    fetchLogs,
    {
      keepPreviousData: true,
    }
  );
};

export { useLogsQuery, fetchLogs };
