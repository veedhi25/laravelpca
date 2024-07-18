
import { useQuery } from "react-query";
import Shop from "@repositories/shop";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchShops = async (): Promise<{ refferal_commission: any }> => {
  
  const url = `${API_ENDPOINTS.GET_REFERRAL_COMMISSION}`;
  const {
    data:{ data },
  } = await Shop.find(url);
  return {
    refferal_commission:data
  };
};

const useRefferalCommissionQuery = () => {
  return useQuery<{ refferal_commission: any }, Error>([API_ENDPOINTS.GET_REFERRAL_COMMISSION],fetchShops);
};

export { useRefferalCommissionQuery, fetchShops };
