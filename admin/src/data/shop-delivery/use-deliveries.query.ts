import {
  QueryParamsType,
} from "@ts-types/custom.types";

import { ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";

import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "react-query";

import { DeliveryService } from "./delivery.service";
type PaginatedOrder = {
  data: any;
  paginatorInfo: any;
};

const fetchDeliveries = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await DeliveryService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await DeliveryService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useDeliveriesQuery = (
  params?: any,
  options?: UseInfiniteQueryOptions<
    PaginatedOrder,
    Error,
    PaginatedOrder,
    PaginatedOrder,
    QueryKey
  >
  
) => {
  return useInfiniteQuery<PaginatedOrder, Error>(
    [API_ENDPOINTS.DELIVERY, params],
    fetchDeliveries,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useDeliveriesQuery, fetchDeliveries };
