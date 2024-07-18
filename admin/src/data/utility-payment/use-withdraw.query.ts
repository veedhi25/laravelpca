import Withdraw from "@repositories/withdraw";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchWithdraw = async (id: string) => {
  const { data } = await Withdraw.find(`${API_ENDPOINTS.BILL}/${id}`);
  return { withdraw: data };
};

type IProps = {
  withdraw: any;
};
export const useWithdrawQuery = (id: string) => {
  return useQuery<IProps, Error>([API_ENDPOINTS.BILL, id], () =>
    fetchWithdraw(id)
  );
};
