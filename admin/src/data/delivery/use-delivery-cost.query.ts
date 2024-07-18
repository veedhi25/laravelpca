import Shop from "@repositories/shop";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchDeliveryCost = async () => {
  const { data } = await Shop.find(`${API_ENDPOINTS.DELIVERY_COST}`);
  return { deliveryCost: data };
};

type IProps = {
  deliveryCost: any;
};
export const useDeliveryCostQuery = (
  options?: UseQueryOptions<IProps, Error, IProps, QueryKey>
) => {
  return useQuery<IProps, Error>(
    [API_ENDPOINTS.DELIVERY_COST],
    () => fetchDeliveryCost(),
    options
  );
};
