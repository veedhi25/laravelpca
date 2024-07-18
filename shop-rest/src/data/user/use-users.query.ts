import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import User from "@components/repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchUsers = async ({ queryKey }: QueryParamsType) => {

  const [_key, params] = queryKey;

  const {
    page,
    text,
    id,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as QueryOptionsType;

  
  const url = `${API_ENDPOINTS.USERS}?&search=${text}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  const {
    data: { data, ...rest },
  } = await User.all(url);
  return { users: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
  };

  const useUsersQuery = (options: QueryOptionsType) => {
    return useQuery<any, Error>(
      [API_ENDPOINTS.USERS, options],
      fetchUsers,
      {
        keepPreviousData: true,
        // refetchInterval: 200, // refetch every 10 seconds
      }
    );
  };
  

 export { useUsersQuery, fetchUsers };
