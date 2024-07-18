import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { DeliveryService } from "./delivery.service";

export const fetchOrderStatuses = async () => {
  const {
    data: { data, ...rest },
  } = await DeliveryService.fetchUrl(API_ENDPOINTS.ORDER_STATUS);
  return {
    order_statuses: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};
export const useOrderStatusesQuery = () => {
  return useQuery<any, Error>(API_ENDPOINTS.ORDER_STATUS, fetchOrderStatuses);
};
