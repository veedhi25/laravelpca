
import 
    { FeatureProductOptionsType, FeatureProduct, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";


// const WalletCommissionService = new CoreApi(API_ENDPOINTS.GET_USER_WALLET_DETAILS);

// export const fetchWalletCommissionProduct = async ({ queryKey }: QueryParamsType) => {
//   const [_key, params] = queryKey;
//   const {
//     data
//   } = await WalletCommissionService.fetchUrl(API_ENDPOINTS.GET_USER_WALLET_DETAILS);

//   return data;
// };

// export const useWalletCommissionQuery = (options: FeatureProductOptionsType) => {
//   return useQuery<{ WalletCommission: { data: FeatureProduct[] } }, Error>(
//     [API_ENDPOINTS.GET_USER_WALLET_DETAILS, options],
//     fetchWalletCommissionProduct
//   );
// };


export const useReferralNetworkQuery = (id: string) => {
  const api = new CoreApi(API_ENDPOINTS.GET_USER_REFERRAL_NETWORK);
  const fetchReferralNetworkProduct = async (id: string) => {
      const response = await api.fetchUrl(`${API_ENDPOINTS.GET_USER_REFERRAL_NETWORK}/${id}` );
      return response.data;
  };
  return useQuery(["referralNetworkProduct", id], () => fetchReferralNetworkProduct(id));
   
}
