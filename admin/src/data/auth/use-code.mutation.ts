import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";


const referralNetworkService = new CoreApi(API_ENDPOINTS.RESEND_CODE);

export const useCodeMutation = async (id: string) => {
  const {
    data
  } = await referralNetworkService.fetchUrl(API_ENDPOINTS.RESEND_CODE+"/"+id);

  return data;
};