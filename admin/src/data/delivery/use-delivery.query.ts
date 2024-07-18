import Withdraw from "@repositories/withdraw";
import { useQuery } from "react-query";
import { Withdraw as TWithdraw } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchDelivery = async (id: string) => {
  const { data } = await Withdraw.find(`${API_ENDPOINTS.DELIVERY}/${id}`);
  return { delivery: data };
};

type IProps = {
  delivery: TWithdraw;
};
export const useDeliveryQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.DELIVERY, id], () =>
    fetchDelivery(id)
  );
};
