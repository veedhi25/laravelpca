import { Children } from "react";
import { QueryKey } from "react-query";


export type CategoriesQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
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
  category?:string;
  is_active?:string;
  search?:string;
  limit?: number;
  type_id?: number;
  status?: string;
};

export type QueryOptionsType = {
  page?: number;
  text?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type OfferOptionsType = {
  location?:any;
  category?:string;
  is_active?:string;
  search?:string;
  limit?: number;
};

export type ProductsQueryOptionsType = {
  type?: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  shop_id?: number;
};

export type ShopsQueryOptionsType = {
  location?:any;
  category?:string;
  is_active?:number;
  search?:string;
  limit?: number;
  price:number;
};

export type OrdersQueryOptionsType = {
  tracking_number?: string;
  orderBy?: string;
  sortedBy?: string;
  customer_id?: number;
  shop_id?: number;
  first?: number;
  page?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export interface SearchParamOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
  rating: string;
  question: string;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ProductQueryOptions extends QueryOptions {
  shop_id: string;
  sortedBy: string;
  orderBy: string;
  name: string;
  categories: string;
  category: string;
  tags: string;
  type: string;
  manufacturer: string;
  author: string;
  price: string;
  min_price: string;
  max_price: string;
  text: string;
  searchType: string;
  searchQuery: string;
}

export interface PopularProductQueryOptions extends QueryOptions {
  type_slug: string;
  with: string;
  range: number;
}

export interface CategoryQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TagQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TypeQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ShopQueryOptions extends QueryOptions {
  name: string;
  is_active: number;
}

export interface AuthorQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ManufacturerQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface CouponQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface OrderQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}
export interface ReviewQueryOptions extends QueryOptions {
  product_id: string;
  rating?: string;
  orderBy?: string;
  sortedBy?: string;
}
export interface QuestionQueryOptions extends QueryOptions {
  product_id: string;
  question?: string;
}
export interface MyQuestionQueryOptions extends QueryOptions {}
export interface MyReportsQueryOptions extends QueryOptions {}
export interface WishlistQueryOptions extends QueryOptions {}

export declare type Type = {
  id: number | string;
  name: string;
  slug: string;
  icon: string;
  // products?: Maybe<ProductPaginator>;
  created_at: Date;
  updated_at: Date;
};
export declare type Coupon = {
  id: number | string;
  code: string;
  description: string;
  // orders: Order[];
  type: string;
  image: string;
  amount: number;
  active_from: Date;
  expire_at: Date;
  created_at: Date;
  updated_at: Date;
};
export declare type Category = {
  id: number | string;
  name: string;
  slug: string;
  parent?: number;
  children: Category[];
  details?: string;
  image?: Attachment;
  icon?: string;
  type: Type;
  products: Product[];
  created_at: Date;
  updated_at: Date;
};

export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = "ASC",
  /** Sort records in descending order. */
  Desc = "DESC",
}

export declare type Attachment = {
  id?: number | string;
  thumbnail?: string;
  original?: string;
};
export declare type AttributeValue = {
  id: string;
};
export declare type Variation = {
  id: string;
  options?: any;
};

export interface QueryOptions {
  page?: number;
  limit?: number;
}

export declare type Product = {
  id?: number | string;
  name?: string;
  slug?: string;
  type?: Type;
  categories?: Category[];
  variations: AttributeValue[];
  variation_options: Variation[];
  // pivot?: OrderProductPivot
  // orders: Order[]
  total_reviews: number;
  ratings: number;
  in_wishlist: boolean;
  rating_count: RatingCount[];
  shop?: any;
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: Attachment[];
  image?: Attachment;
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

export interface RatingCount {
  rating: number;
  total: number;
}

export declare type UserAddress = {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export interface CreateReviewInput {
  product_id: string;
  shop_id: string;
  order_id: string;
  variation_option_id: string;
  comment?: string;
  rating: number;
  photos?: Attachment[];
}

export interface UpdateReviewInput extends CreateReviewInput {
  id: string;
}
export interface ReviewResponse {
  product_id: string;
}

export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}
export interface CreateAbuseReportInput {
  model_id: string;
  model_type: string;
  message: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: Attachment[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Reports {
  id: string;
  message: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}

export declare type Order = {
  id: number | string;
  tracking_number: string;
  customer_id: number | string;
  // customer?: Maybe<User>;
  // status: OrderStatus;
  amount: number;
  children: Order[];
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
  billing_address?: UserAddress;
  // shipping_address?: UserAddress;
};

export interface Wishlist {
  id: string;
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}
export interface ProductPaginator extends PaginatorInfo<Product> {}

export interface CategoryPaginator extends PaginatorInfo<Category> {}

export interface ShopPaginator extends PaginatorInfo<Shop> {}

// export interface AuthorPaginator extends PaginatorInfo<Author> {}

// export interface ManufacturerPaginator extends PaginatorInfo<Manufacturer> {}

export interface CouponPaginator extends PaginatorInfo<Coupon> {}

export interface TagPaginator extends PaginatorInfo<Tag> {}

export interface OrderPaginator extends PaginatorInfo<Order> {}

// export interface OrderStatusPaginator extends PaginatorInfo<OrderStatus> {}

// export interface RefundPaginator extends PaginatorInfo<Refund> {}

export interface ReviewPaginator extends PaginatorInfo<Review> {}

export interface QuestionPaginator extends PaginatorInfo<Question> {}

export interface ReportsPaginator extends PaginatorInfo<Question> {}

// export interface DownloadableFilePaginator
//   extends PaginatorInfo<DownloadableFile> {}

export interface WishlistPaginator extends PaginatorInfo<Wishlist> {}


export type SettingsType = {
  id: number | string;
  options: SettingsOptions;
};

export type SettingsOptions = {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  logo?: Attachment;
  taxClass?: string;
  // shippingClass?: string;
};
export interface OTPVerifyResponse {
  success: string;
  message: string;
}

export type Shop = {
  [key: string]: any;
};
export type FeatureProduct = {
  [key: string]: any;
};
export type Offer = {
  [key: string]: any;
};
export type Search = {
  [key: string]: any;
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

export type InvoiceUploadQueryOptionsType = {
  text?: string;
  shop_id?: number;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export interface ManufacturerQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}
export interface ReviewQueryOptions extends QueryOptions {
  product_id: string;
  rating?: string;
  orderBy?: string;
  sortedBy?: string;
}
export interface QuestionQueryOptions extends QueryOptions {
  product_id: string;
  question?: string;
}
export interface MyQuestionQueryOptions extends QueryOptions {}
export interface MyReportsQueryOptions extends QueryOptions {}
export interface WishlistQueryOptions extends QueryOptions {}

// export interface Attachment {
//   id: number;
//   original: string;
//   thumbnail: string;
//   __typename?: string;
// }

// export interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   sku: string;
//   is_digital: boolean;
//   product_type: string;
//   description: string;
//   price: number;
//   sale_price: number;
//   min_price: number;
//   max_price: number;
//   unit: string;
//   quantity: number;
//   image: Attachment;
//   gallery: Attachment[];
//   total_reviews: number;
//   ratings: number;
//   in_wishlist: boolean;
//   rating_count: RatingCount[];
//   variations: object[];
//   variation_options: object[];
  
//   related_products: Product[];
//   created_at: string;
//   updated_at: string;
// }

export interface RatingCount {
  rating: number;
  total: number;
}

export interface CreateReviewInput {
  product_id: string;
  shop_id: string;
  order_id: string;
  variation_option_id: string;
  comment?: string;
  rating: number;
  photos?: Attachment[];
}
export interface UpdateReviewInput extends CreateReviewInput {
  id: string;
}
export interface ReviewResponse {
  product_id: string;
}

export interface CreateFeedbackInput {
  model_id: string;
  model_type: string;
  positive?: boolean;
  negative?: boolean;
}
export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}
export interface CreateAbuseReportInput {
  model_id: string;
  model_type: string;
  message: string;
}
export interface Address {
  id: string;
  title: string;
  type: any;
  address: {
    __typename?: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  wallet: {
    total_points: number;
    points_used: number;
    available_points: number;
  };
  profile: {
    id?: string;
    contact?: string;
    bio?: string;
    avatar?: Attachment;
  };
  address: Address[];
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}


export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: Attachment[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  created_at: string;
  updated_at: string;
}
export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}
export interface Wishlist {
  id: string;
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}
