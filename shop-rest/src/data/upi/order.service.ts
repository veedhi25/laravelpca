import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";



class Order extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

}

export const OrderService = new Order(API_ENDPOINTS.UPI_PAYMENT);
