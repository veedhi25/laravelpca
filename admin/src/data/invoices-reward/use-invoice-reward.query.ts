import Withdraw from "@repositories/withdraw";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchBillReward = async () => {
  const { data } = await Withdraw.find(`${API_ENDPOINTS.BILL_REWARD}`);
  
  return { reward:data };
};


export const useBillRewardQuery = () => {
  return useQuery<any, Error>([API_ENDPOINTS.BILL_REWARD], () =>
  fetchBillReward()
  );
};
