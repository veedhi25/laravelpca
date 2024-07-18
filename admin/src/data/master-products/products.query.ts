import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Product as P
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useInfiniteQuery } from "react-query";
import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";

type PaginatedProduct = {
  data: P[];
  paginatorInfo: any;
};
const fetchProducts = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<any> => {
  const [_key, params] = queryKey;
  let fetchData:any={}
  if(pageParam){
    if(process.browser&&window.document.domain!="localhost"){
      pageParam=pageParam.replace("http","http");
    }
    fetchData= await Product.all(pageParam)
  }else{
    const {
      page,
      text,
      type,
      category,
      shop_id,
      status,
      limit = 15,
      orderBy = "updated_at",
      sortedBy = "DESC",
    } = params as ProductsQueryOptionsType;
    const searchString = stringifySearchQuery({
      name: text,
      type,
      category,
      status,
      shop_id,
    });
    const url = `${API_ENDPOINTS.MASTER_PRODUCT}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    fetchData= await Product.all(url);
  }

  const {
    data: { data, ...rest },
  } =fetchData;

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) => {
  return useInfiniteQuery<any, Error>(
    [API_ENDPOINTS.MASTER_PRODUCT, params],
    fetchProducts, {
    ...options,
    keepPreviousData: true,
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getNextPageParam: ({ products: { paginatorInfo } }) => paginatorInfo.nextPageUrl,
  });
};

export { useProductsQuery, fetchProducts };
