import 
    { FeatureProductOptionsType, FeatureProduct, QueryParamsType}
    from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const referralNetworkService = new CoreApi(API_ENDPOINTS.REFERRAL_NETWORK);
export const fetchReferralNetworkProduct = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    data
  } = await referralNetworkService.fetchUrl(API_ENDPOINTS.REFERRAL_NETWORK);

  return data;
};
export const useReferralNetworkQuery = (options: FeatureProductOptionsType) => {
  return useQuery<{ referralNetwork: { data: FeatureProduct[] } }, Error>(
    [API_ENDPOINTS.REFERRAL_NETWORK, options],
    fetchReferralNetworkProduct
  );
};
