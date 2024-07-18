import {
  QueryParamsType,
  WithdrawsQueryOptionsType,
} from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Withdraw from "@repositories/withdraw";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { WithdrawPaginator } from "@ts-types/generated";

const fetchDeliveries = async ({
  queryKey,
}: QueryParamsType): Promise<{ withdraws: WithdrawPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as WithdrawsQueryOptionsType;

  const url = `${API_ENDPOINTS.ADMIN_DELIVERY}?limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  const {
    data: { data, ...rest },
  } = await Withdraw.all(url);
  return {
    withdraws: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useDeliveriesQuery = (
  params: WithdrawsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ withdraws: WithdrawPaginator }, Error>(
    [API_ENDPOINTS.WITHDRAWS, params],
    fetchDeliveries,
    { ...options, keepPreviousData: true }
  );
};

export { useDeliveriesQuery, fetchDeliveries };