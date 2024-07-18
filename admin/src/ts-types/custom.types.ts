import { QueryKey } from "react-query";
import { SortContacts } from "./generated";
import { SortOrder } from "./generated";

export type CategoriesQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type FetureShopOptionsType = {
  location?:any;
  category?:string;
  is_active?:string;
  search?:string;
  limit?: number;
};
export type FeatureProductOptionsType = {
  location?:any;
  id?:string;
  category?:string;
  is_active?:string;
  search?:string;
  limit?: number;
};
export type TagsQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ShopsQueryOptionsType = {
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type WithdrawsQueryOptionsType = {
  text?: string;
  shop_id?: number;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type ContactsQueryOptionsType = {
  text?: string;
  id?: number;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortContacts;
};
export type ProductsQueryOptionsType = {
  page?: number;
  shop_id?: number;
  text?: string;
  type?: string;
  category?: string;
  status?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export declare type Product = {
  id?: number | string;
  name?: string;
  slug?: string;
  type?: any[];
  categories?: any[];
  variations: any[];
  variation_options: any[];
  // pivot?: OrderProductPivot
  // orders: Order[]
  shop?: any;
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: any[];
  image?: any[];
  // status?: ProductStatus
  height?: string;
  length?: string;
  width?: string;
  price?: number;
  min_price?: number;
  max_price?: number;
  related_products?: Product[];
  quantity?: number;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};
export type TypesQueryOptionsType = {
  page?: number;
  text?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type StaffsQueryOptionsType = {
  page?: number;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryOptionsType = {
  page?: number;
  text?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  userId: number;
  pageParam?: string;
};

export type FeatureProduct = {
  [key: string]: any;
};
