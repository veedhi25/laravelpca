import Product from "@repositories/product";
import { useQuery } from "react-query";
import { Product as TProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchProduct = async (shop_id: string) => {
  // const { data } = await Product.find(`${API_ENDPOINTS.MASTER_PRODUCT}/${shop_id}`);
  // return data;
  const url = `${API_ENDPOINTS.CREATED_MASTER_PRODUCT}?shop_id=${shop_id}`;
  const  fetchData= await Product.all(url);

  const {data}=fetchData
  return data;
};

export const useProductQuery = (shop_id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.CREATED_MASTER_PRODUCT , shop_id], () =>
    fetchProduct(shop_id)
  );
};
