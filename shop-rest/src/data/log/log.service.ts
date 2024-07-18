import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";

class Log extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }
}
export const LogService = new Log(API_ENDPOINTS.LOGS);
