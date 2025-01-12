import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchStudents = async ({ queryKey }: QueryParamsType) => {
  
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;

  const url = `${API_ENDPOINTS.STUDENTS_LIST}?search=${text}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await User.all(url);
  return { users: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useStudentsQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.STUDENTS_LIST, options], fetchStudents, {
    keepPreviousData: true,
  });
};

export { useStudentsQuery, fetchStudents };
